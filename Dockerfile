FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["SignalRChat.csproj", "AngularWebApp/"]
RUN dotnet restore "AngularWebApp/SignalRChat.csproj"
COPY . .
WORKDIR "/src/AngularWebApp"

FROM ${NODE_IMAGE} as node-build
WORKDIR /AngularWebApp
COPY AngularWebApp/ClientApp .
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -yq
RUN npm install
RUN npm install -g @angular/cli@7.3.9
RUN npm run-script build

FROM build AS publish
RUN dotnet publish "SignalRChat.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY --from=node-build /src/dist ./ClientApp/dist
ENTRYPOINT ["dotnet", "SignalRChat.dll"]
