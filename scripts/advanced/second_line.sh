sudo bw_tool -a 94 -I -D /dev/i2c-1 -a 94 -w 11:20;
sudo bw_tool -a 94 -I -D /dev/i2c-1 -a 94 -t "$1";
sudo sleep 0.5;