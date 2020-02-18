#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apt-get install --yes curl
RUN apt-get install -y nodejs

COPY ["package.json", ""]
COPY ["package-lock.json", ""]
WORKDIR /src/
RUN npm install
RUN npm install -g @angular/cli@7.3.9
RUN ng build

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["SignalRChat.csproj", ""]
RUN dotnet restore "./SignalRChat.csproj"
COPY . .
WORKDIR "/src/."
RUN 
RUN dotnet build "SignalRChat.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SignalRChat.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SignalRChat.dll"]
