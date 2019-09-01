Hello freghts :)

Since this code challange is not perfect ( not even close ) I would like to write what I would have done better if
I were to have more time.

1. Proper container/presentational components separation
    - Since I wanted to move fast ( breaking fast ) I decited to hook state and actions directly to the place where they need to be called, reducing the amont of code I need to write to enable proper prop drilling... wrong I know...
2. Test
    - Total fail for me here, I did not include any of thos test, not just because of timne but because only the Store is test friendly, rest of the cpm not so much because of nunber 1 above 1...
3. Styles
    - For moving fast I descided to go for Material UI, but still wanted to srite scss as while I was setting up the project I added code spliting for scss or raw css files. Material ui does not play well with scss unless you make him do, which I did not...
4. Actions 
    - They are not so DRY... There is a lot of duplication and with use of help/util func it could not just look better but also easier to write more code in the future.

Regarless on above still I still had fun. Thanks.

Available scripts:

1. start - dev mode with dev server
2. build - production ready build 
3. start:mocks = run dev server and mock server
3. mocks = run mock server

Project setup - run
1. Not mandatory: Set up .env.develompent use .example as a guide, if not set .example will be used for dev mode
2. Yarn or npm install
3. Yarn start:mocks