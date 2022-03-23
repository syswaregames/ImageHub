//
// Patrick Carvalho
// copyright 2022
//

using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.IO;
using MySql.Data.MySqlClient;


// para saber mais sobre dapper com unit of work: https://balta.io/blog/dapper-unit-of-work-repository-pattern
namespace ImageHubApi.Repositories
{
    /// <summary>
    /// Define a classe UnitOfWork.
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {

        System.Data.Common.DbConnection _conexao = null;
        IDbTransaction _currentTransaction = null;


        public UnitOfWork()
        {
            if (_conexao == null)
            {
                //_conexao = ProfiledDbConnectionFactory.New(new MySqlDbConnectionFactory(ObterStringConexao()), CustomDbProfiler.Current); //Esse wrapper aki é só pra ser inspecionado pelo miniProfiler.
                _conexao = new MySqlConnection(ObterStringConexao());
            }

            if (_conexao.State == ConnectionState.Closed)
            {
                _conexao.Open();
            }
        }

        /// <summary>
        /// Get Conexao.
        /// </summary>
        System.Data.Common.DbConnection IUnitOfWork.Conexao
        {
            get { return _conexao; }
        }

        /* A diferença dessa função de transaction, é que ela vai ignorar transactions aninhadas*/
        public TransactionControl BeginTransaction()
        {
            if (_currentTransaction == null)
            {
                _currentTransaction = _conexao.BeginTransaction();
                return new TransactionControl(
                    () => { _currentTransaction.Commit(); _currentTransaction = null; },
                        () => { _currentTransaction.Rollback(); _currentTransaction = null; });
            }
            else
            {
                return new TransactionControl(() => { }, () => { });
            }
        }

        public void Dispose()
        {
            _conexao?.Dispose();
        }

        /// <summary>
        /// Obtém a string de conexão.
        /// </summary>
        /// <returns>A string de conexão com o banco de dados.</returns>
        private string ObterStringConexao()
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{envName}.json", true)
                .Build();
            return configuration.GetConnectionString("Sysware");
        }
    }
}

public class TransactionControl
{
    public TransactionControl(System.Action Commit, System.Action Rollback)
    {
        this.Commit = Commit;
        this.Rollback = Rollback;
    }
    public System.Action Commit;
    public System.Action Rollback;
}