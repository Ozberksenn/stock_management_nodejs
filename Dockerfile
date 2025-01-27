# 1. Node.js'un resmi bir versiyonunu seç
FROM node:18-alpine

# 2. Uygulama için çalışma dizinini oluştur
WORKDIR /usr/src/app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Uygulama kodlarını kopyala
COPY . .

# 6. Sunucuyu çalıştırmak için kullanılan portu tanımla
EXPOSE 8080

# 7. Uygulamayı çalıştır
CMD ["node", "app.js"]