wget -q -U "Mozilla/5.0" --post-file "$1" --header "Content-Type: audio/x-flac; rate=16000" -O - "http://www.google.com/speech-api/v1/recognize?lang=pt-br&client=chromium" | cut -d\" -f12  > "$2";
value=`cat $2`;
rm "$2"
echo "$value";