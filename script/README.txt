RUN per file:
docker exec -it pg_import psql -U lunaCalculator -d luna -f /script/SQL/import_tooltip.sql


RUN ALL:
docker exec -it pg_import bash -c "sed -i 's/\r$//' /script/bash/run_all.sh" <- run this if get clrf error
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


.\Convert-SkillGetList.ps1 -InputFile .\raw_data\raw_data\SKILL_GET_LIST.txt -OutputFile .\script\raw_data\JOB_SKILL_RAW.txt
.\Convert-ToolTipMsg.ps1 -InputFile ..\raw_data\ToolTipMsg.txt -OutputFile ..\CSV\tooltip.csv
.\Convert-SkillList.ps1 -InputFile ..\raw_data\Skill_Buff_List.txt -OutputFile ..\CSV\skillBuffList.csv -FieldCount 34 -AsciiOnly

pm2 start cloudflared --name tunnel -- tunnel --no-autoupdate --url http://localhost:5154
pm2 logs tunnel --lines 50 | grep trycloudflare
pm2 save
pm2 startup

kalau kena error type

docker exec -it pg_import bash
apt update && apt install -y dos2unix
dos2unix /script/bash/run_all.sh

bash /script/bash/run_all.sh