$APP_NAME = "server"

# Crear directorio bin si no existe
New-Item -ItemType Directory -Force -Path ".\bin"

# Compilar para Windows (64-bit)
Write-Host "Compilando para Windows 64-bit..."
$env:GOOS = "windows"; $env:GOARCH = "amd64"; go build -o ".\bin\${APP_NAME}_windows_amd64.exe" .\server.go

# Compilar para Windows (32-bit)
Write-Host "Compilando para Windows 32-bit..."
$env:GOOS = "windows"; $env:GOARCH = "386"; go build -o ".\bin\${APP_NAME}_windows_386.exe" .\server.go

# Compilar para macOS (Intel)
Write-Host "Compilando para macOS Intel..."
$env:GOOS = "darwin"; $env:GOARCH = "amd64"; go build -o ".\bin\${APP_NAME}_darwin_amd64" .\server.go

# Compilar para macOS (Apple Silicon/M1)
Write-Host "Compilando para macOS Apple Silicon..."
$env:GOOS = "darwin"; $env:GOARCH = "arm64"; go build -o ".\bin\${APP_NAME}_darwin_arm64" .\server.go

Write-Host "¡Compilación completada!"
Get-ChildItem .\bin
