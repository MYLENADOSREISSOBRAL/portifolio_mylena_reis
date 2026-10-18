# ============================================================================
# Apresentar na rede local: liga o site neste computador para que celulares
# na MESMA rede Wi-Fi abram os slides pelo QR code da capa.
#
# Uso (na pasta do projeto):
#   powershell -ExecutionPolicy Bypass -File .\apresentar-na-rede.ps1
#
# O QR code só aparece nos slides com "qr_rede: true" no cabeçalho e só
# quando o site é servido por este script (nunca no GitHub Pages).
# Para encerrar: Ctrl+C.
# ============================================================================

$porta = 4000

# Endereço IPv4 deste computador na rede (interface com gateway padrão)
$config = Get-NetIPConfiguration |
  Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -eq "Up" } |
  Select-Object -First 1

if ($null -eq $config) {
  Write-Host "Nenhuma rede conectada. Conecte-se ao Wi-Fi e tente de novo." -ForegroundColor Red
  exit 1
}

$ip = ($config.IPv4Address | Select-Object -First 1).IPAddress
$endereco = "http://${ip}:$porta"

# Configuração extra lida só nesta execução (arquivos com "_" não são publicados)
# (UTF-8 sem BOM, que o Jekyll lê sem problemas)
[System.IO.File]::WriteAllLines(
  (Join-Path $PSScriptRoot "_config_rede.yml"),
  [string[]]@(
    "# Gerado por apresentar-na-rede.ps1 - endereço deste computador na rede local",
    "rede_local: `"$endereco`""
  ),
  (New-Object System.Text.UTF8Encoding($false))
)
Set-Location $PSScriptRoot

# Firewall do Windows: libera a porta só em redes privadas/de domínio.
# Criar a regra exige abrir o PowerShell como administrador (uma vez só).
$regra = "Jekyll - apresentação na rede local (porta $porta)"
if (-not (Get-NetFirewallRule -DisplayName $regra -ErrorAction SilentlyContinue)) {
  try {
    New-NetFirewallRule -DisplayName $regra -Direction Inbound -Protocol TCP `
      -LocalPort $porta -Action Allow -Profile Private,Domain -ErrorAction Stop | Out-Null
    Write-Host "Regra do Firewall criada para a porta $porta." -ForegroundColor Green
  } catch {
    Write-Host "Não foi possível liberar a porta $porta no Firewall (precisa de administrador)." -ForegroundColor Yellow
    Write-Host "Se os celulares não conseguirem abrir, rode este script uma vez como administrador." -ForegroundColor Yellow
  }
}

if ($config.NetProfile.NetworkCategory -eq "Public") {
  Write-Host "A rede '$($config.NetProfile.Name)' está como PÚBLICA: o Windows bloqueia o acesso de outros aparelhos." -ForegroundColor Yellow
  Write-Host "Mude para Privada em Configurações > Rede e Internet > Wi-Fi > (rede) > Tipo de perfil de rede." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Apresentação na rede local: $endereco/portifolio_mylena_reis/slides/" -ForegroundColor Cyan
Write-Host "Abra os slides neste computador e mostre a capa: o QR code leva a esse endereço."
Write-Host "Ctrl+C para encerrar."
Write-Host ""

bundle exec jekyll serve --host 0.0.0.0 --port $porta --config "_config.yml,_config_rede.yml"
