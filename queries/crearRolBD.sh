#!/bin/bash

echo 'SCRIPT DE CONFIGURACION DE USUARIO EN LINUX'
echo 'DEBES TENER YA INSTALADO POSTGRESQL'

sudo -u postgres psql
CREATE USER tato WITH PASSWORD 'password';
ALTER ROLE tato CREATEDB;
\q

echo 'INTRODUCE LITERALMENTE -> password'
psql -d postgres -U tato
CREATE DATABASE miner_ucab;
\q

echo 'LISTO'
