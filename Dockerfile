# Stage 1 - Build App
FROM microsoft/aspnetcore-build:2.0 AS build-env

# Copy App sources
WORKDIR /app/src
COPY . ./

# Compile App
RUN dotnet publish -c Release -o ../bin

# Stage 2 - Run App
FROM microsoft/aspnetcore:2.0

# Install Node (used for server pre-rendering)
RUN apt-get update && \
    apt-get install -y gnupg && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

# Copy App binaries
WORKDIR /app
COPY --from=build-env /app/bin .

EXPOSE 80

ENTRYPOINT ["dotnet", "nabe.order.management.dll"]