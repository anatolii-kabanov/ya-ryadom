# ya-v-dele
## Требования:
1. Net Core SDK [Net Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)

2. Nodejs [Nodejs](https://nodejs.org/en/download/)


	IDE например Visual Studio [VS 2019 Community](https://visualstudio.microsoft.com/ru/vs/community/)
	
 	или же пользуемся только SDK 
	
 
3. PostgreSQL Version 11 [PostgreSQL](https://www.postgresql.org/download/)

- Устанавливаем так же PostGIS, компонент находится в дополнительном установщике Stack Builder

	**Найти и поставить галочку напротив PostGIS**

- Запускаем **pgAdmin**

- Создаем пользователя в БД с правами **Superuser**  **(Логин: 'ya_v_dele'; Пароль: '123456';)**

4. По умолчанию порт для API 4044, изменить его можно *YaVDele.API/Program.cs* в методе UseUrls("http://localhost:4044", "https://localhost:4045")

- Сначала нужно запустить build, для этого открываем консоль в директории *ya-v-dele-api\YaVDele\YaVDele.API* 

	**dotnet publish YaVDele.API.csproj**

-  Открываем консоль в директории *ya-v-dele-api\YaVDele\YaVDele.API\bin\Debug\netcoreapp3.1* 

	И запускаем API

	**dotnet YaVDele.API.dll**

*во время первого старта будет инициализирована БД*
	
	В консоле должны появится следующие строки:
		info: Microsoft.Hosting.Lifetime[0]
		  Now listening on: http://localhost:4044
		info: Microsoft.Hosting.Lifetime[0]
		  Now listening on: https://localhost:4045
		  
5. Так же понадобится ngrok, чтобы обращатся к нашему локальному api [Ngrok настройка](https://dashboard.ngrok.com/get-started/setup) 

	После, в отдельной консоли запускаем ./ngrok http 4044
	
**Нам нужна строка с https**
	
	Forwarding  https://xxxxxxxxxxxx.ngrok.io -> http://localhost:4044 
	
- Открываем файлы .env .env.development в корне директории ya-v-dele-ui
	и изменяем переменную на глобальный адрес. Теперь mini app может достучатся до api
	REACT_APP_API_ENDPOINT=https://xxxxxxxxxxxx.ngrok.io/api/v1
	
6. Открываем консоль в директории *ya-v-dele-ui*

**Выполняем команду npm i** 

	Поменять порт можно в package.json на строке "start": "cross-env PORT=3000 react-scripts start",
	
**Выполняем команду npm start**

7. Устанавливаем VK tunel по ссылке, чтобы можно было добавить ссылку на приложение в настройках vk.com

	[VK tunnel](https://vk.com/dev/vk_tunnel?f=1.%20%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)

**Делаем по инструкции**

Открываем консоль и запускаем Vk tunnel

	vk-tunnel --insecure=0 --http-protocol=http --ws-protocol=wss --host=localhost --port=3000
	
После подтверждения доступа, нужна будет ссылка 

	https://userXXXXXXX-nevvghva.wormhole.vk-apps.com/
	
