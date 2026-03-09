RUN per file:
docker exec -it pg_import psql -U lunaCalculator -d luna -f /script/SQL/import_tooltip.sql


RUN ALL:
docker exec -it pg_import bash /script/bash/run_all.sh