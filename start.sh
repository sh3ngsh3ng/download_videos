#!/bin/bash
echo "Downloading Files...."
sleep 1
node index3
echo "Files downloaded..."
sleep 1
echo "Merging video files..."
sleep 1

function change() {
    echo "Changing directory"
    # need to run . start.sh for the below to work
    cd "./downloads"
}
change

echo "Commencing merging...."
sleep 1

# for i in `\ls *.ts | sort -V`; do echo "file '$i'"; done >> mylist.txt
array=()
for i in `\ls *.ts | sort -V`; do array+=("$i"); done
listOfVideos=${array[@]}
cat $listOfVideos > download.ts
rm $listOfVideos

echo "Files successfully merged. Download Completed."
echo "Moving files to Downloaded folder."
mv ./download.ts ../downloaded
cd ..
rm index.m3u8
echo "Completed"