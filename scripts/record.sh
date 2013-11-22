rm "$1";
arecord -D plughw:0,0 -q -f cd -t wav -d 0 -r 16000 --duration=3 | flac - -f --best --sample-rate 16000 -s -o "$1";