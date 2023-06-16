FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
#RUN npm install
RUN npm install --only=production
COPY . ./
ENV PORT 5000
ENV VITE_APISERVER=https://pcb01.parikshaworld.com  
ENV DB_URI="mongodb+srv://smbarge:csswakad%408782@cluster-01.9ufne.mongodb.net/pcb-01-2023?retryWrites=true&w=majority"
ENV AWS_ACCESS_KEY_ID="AKIASBOROETZS5XGM25L"
ENV AWS_SECRET_ACCESS_KEY="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"
EXPOSE $PORT
CMD ["npm","run","start"]

