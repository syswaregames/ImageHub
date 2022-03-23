//
// Patrick Carvalho
// copyright 2022
//

using MySql.Data.MySqlClient;
using System.Data;
using System;

namespace ImageHubApi.Repositories
{
    /// <summary>
    /// Define a interface IUnitOfWork.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Get Conexao.
        /// </summary>
        System.Data.Common.DbConnection Conexao { get; }

        TransactionControl BeginTransaction();

        /// <summary>
        /// Get Transacao.
        /// </summary>
     /*   IDbTransaction Transacao { get; }*/

    }
}
