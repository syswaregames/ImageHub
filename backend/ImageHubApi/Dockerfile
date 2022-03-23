FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build-env
WORKDIR /app

# Copy csproj and retore
COPY *.csproj ./
RUN dotnet restore

RUN pwsh -Command Write-Host "Mvc31: Gerating Docker Image and testing PowerShell Core"

# Build app
COPY . ./
RUN dotnet publish -c Release -o dist
#RUN mv /app/ImageHubApi.xml /app/ImageHubApi.XML

# Build da image
FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
WORKDIR /app
COPY --from=build-env /app/dist .
EXPOSE 80
ENTRYPOINT ["dotnet", "ImageHubApi.dll"]