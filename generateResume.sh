CID=$(docker run -d -p 8080:8080 olepetersen/jsonresume2latex:0.2.4)
echo "Container ID: $CID"
sleep 3
curl localhost:8080/to_pdf -H "Content-Type: application/json" -d @util/resume.json -o public/resume.pdf
docker kill $CID