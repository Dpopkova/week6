export default (express, bodyParser, createReadStream, crypto, http, connect, writeFileSync, puppeteer) => {
  const app = express();
  app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
  res.append("Access-Control-Allow-Headers", "Accept, Content-Type, Authorization, X-Requested-With")
  next();
});

app.get('/login/', (req, res) => {
  res.send('itmo283528')
})

app.use(bodyParser.json()); 
app.set('view engine','pug')
app.get('/wordpress/wp-json/wp/v2/posts/1', (req,res) => { 
  res.json({
    id: 1,
    title: {rendered: 'itmo283528'}
  })
})

app.get('/test/', async (req,res) => {
  const URL = req.query.URL
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox',  '--disable-setuid-sandbox']})
  const page = await browser.newPage();
  await page.goto(URL)
  await page.waitForSelector('#bt')
  await page.click('#bt')
  const result = await page.$eval('#inp', el => el.value)
  browser.close()
  res.send(result)
})

app.all('*', function( req, res) {
    res.send('itmo283528')
})

return app;
}
