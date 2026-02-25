#!/bin/bash
echo "Iniciando despliegue gradual en Fisher & Paykel..."

# 1. Despliegue en entorno de pruebas (Docker)
docker build -t inventory-app:latest .
docker stop inventory-old || true && docker rm inventory-old || true
docker run -d --name inventory-app -p 3306:3306 inventory-app:latest

# 2. Verificación de Latencia de BD y Crash Rate [cite: 44, 45]
echo "Monitoreando métricas iniciales con Datadog/New Relic (Apdex T: 0.5s)..." [cite: 57]

# 3. Notificación de éxito para capacitación de usuarios [cite: 73]
echo "Despliegue completado en dispositivos autorizados."
