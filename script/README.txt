RUN per file:
docker exec -it pg_import psql -U lunaCalculator -d luna -f /script/SQL/import_tooltip.sql


RUN ALL:
docker exec -it pg_import bash /script/bash/run_all.sh


awk -F',' '{
  first=$1
  second=$2
  rest=""
  for(i=3;i<=NF;i++){
    if(rest=="") rest=$i
    else rest=rest","$i
  }
  print first","second",\""rest"\""
}' /script/raw_data/SKILL_GET_LIST.txt > JOB_SKILL_RAW.txt




kalau kena error type

docker exec -it pg_import bash
apt update && apt install -y dos2unix
dos2unix /script/bash/run_all.sh

bash /script/bash/run_all.sh