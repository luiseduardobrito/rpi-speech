sudo bw_tool -I -D /dev/i2c-1 -a 94 -r 16 -v 0;
sudo bw_tool -I -D /dev/i2c-1 -a 94 -t "$1";
sleep 0.5;