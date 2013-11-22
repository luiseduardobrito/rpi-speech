#!/bin/bash

sudo bw_tool -I -D /dev/i2c-1 -a 94 -r 16 -v 0
sudo bw_tool -I -D /dev/i2c-1 -a 94 -t "Diga um comando"

while true
do
	ibase=16;
	B1=$(sudo bw_tool -a 94 -D /dev/i2c-1 -R 0x20 | tail -n 1)
	if [[ $B1 -eq "00" ]]; then
		echo "recording..."
		sudo bw_tool -I -D /dev/i2c-1 -a 94 -r 16 -v 0
		sudo bw_tool -I -D /dev/i2c-1 -a 94 -t "Ouvindo..."
		arecord -D plughw:0,0 -q -f cd -t wav -d 0 -r 16000 | flac - -f --best --sample-rate 16000 -s -o input.flac &
		sleep 4;
		kill %%;
		sudo bw_tool -I -D /dev/i2c-1 -a 94 -r 16 -v 0;
		sudo bw_tool -I -D /dev/i2c-1 -a 94 -t "Processando...";
		sleep 1;
		echo "fetching stt...";
		wget -q -U "Mozilla/5.0" --post-file input.flac --header "Content-Type: audio/x-flac; rate=16000" -O - "http://www.google.com/speech-api/v1/recognize?lang=pt-br&client=chromium" | cut -d\" -f12  > stt.txt;
		value=`cat stt.txt`;
		echo "command: $value";
		./display.sh "$value";
		sleep 1;
		sudo rm input.flac;
		sudo rm stt.txt;
		sudo bw_tool -I -D /dev/i2c-1 -a 94 -r 16 -v 0
		sudo bw_tool -I -D /dev/i2c-1 -a 94 -t "Diga um comando"

	sleep 1;
fi
done
