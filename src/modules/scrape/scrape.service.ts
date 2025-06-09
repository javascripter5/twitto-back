import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { countriesData } from 'src/utils/countries-data/countries-data';
@Injectable()
export class ScrapeService {

  // async onModuleInit() {
  //   const browser = await puppeteer.launch({ devtools: true, defaultViewport: null, headless: false })
  //   await this.newsLink(browser, countriesData['fr-xl'].name, countriesData['fr-xl'].links)
  //   // await this.newsLink(browser, countriesData['es-xl'].name, countriesData['es-xl'].links)
  //   // await this.newsLink(browser, countriesData['es-ar'].name, countriesData['es-ar'].links)
  //   // await this.newsLink(browser, countriesData['en-au'].name, countriesData['en-au'].links)

  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])
  //   // await this.newsLink(browser, "ar-eg", [])



  // }


  async getNewsPage(url, pageId, browser) {
    let articleBody
    let imageDiv
    let logo_author

    console.log('collecting________')

    let article = { image: '', logo: '', creator: [], content: '', pubDate: '' }

    let page = await browser.newPage();
    await page.goto(url, /*{ waitUntil: ['networkidle0', "domcontentloaded", "load", "networkidle2"], timeout: 100000 }*/)
    try {

      await (await page.waitForSelector(".article-cont-read-button")).click({ count: 2 })
    } catch (error) {
      console.log("no click");

    }

    try {

      articleBody = await page.evaluateHandle(`document.querySelector("#ViewsPageId-${pageId} > div:nth-child(2) > div.articlePage_gridLayout_aligned-DS-EntryPoint1-1.articlePage_gridLayout_5col-DS-EntryPoint1-1 > div.articlePage_gridarea_article-DS-EntryPoint1-1.articlePage_gridarea_article > div.articlePage_articleContentContainer-DS-EntryPoint1-1.dwellTimeStartAllowed-${pageId} > div > div.articlePage_absoluteContentWrapper-DS-EntryPoint1-1.articlePage_absoluteContentWrapper_noMargin-DS-EntryPoint1-1 > div > div > div:nth-child(1) > section.articlePageBodySection.articlePage_section_new-DS-EntryPoint1-1.articlePage_enableNewGrid-DS-EntryPoint1-1 > msn-article-reader > article > msn-article").shadowRoot.querySelector("body")`);
      const resultHandle = await page.evaluateHandle(body => body["innerHTML"], articleBody);
      const htmlBody = await resultHandle.jsonValue()
      await resultHandle.dispose();  // Click element
      const $ = cheerio.load(htmlBody)
      const ps = $("body").children() // paragraphs
      ps.each((index, el) => {
        let checkAnchor = $(el).find("a")
        if (!checkAnchor.html()) article.content += $(el).text()
      })

    } catch (error) {
      console.log("content");

    }


    try {

      imageDiv = await page.evaluateHandle(`document.querySelector("#ViewsPageId-${pageId} > div:nth-child(2) > div.articlePage_gridLayout_aligned-DS-EntryPoint1-1.articlePage_gridLayout_5col-DS-EntryPoint1-1 > div.articlePage_gridarea_article-DS-EntryPoint1-1.articlePage_gridarea_article > div.articlePage_articleContentContainer-DS-EntryPoint1-1.dwellTimeStartAllowed-${pageId} > div > div.articlePage_absoluteContentWrapper-DS-EntryPoint1-1.articlePage_absoluteContentWrapper_noMargin-DS-EntryPoint1-1 > div > div > div:nth-child(1) > section.articlePageBodySection.articlePage_section_new-DS-EntryPoint1-1.articlePage_enableNewGrid-DS-EntryPoint1-1 > msn-article-reader > article > msn-article > div.article-image-slot > msn-article-image").shadowRoot.querySelector("div")`)
      const resultImageDiv = await page.evaluateHandle(div => div["innerHTML"], imageDiv);
      const htmlImage = await resultImageDiv.jsonValue()
      await resultImageDiv.dispose();  // Click element
      const images = cheerio.load(htmlImage)
      const image = images("img").attr("src")
      article.image = image


    } catch (error) {
      console.log("image");

    }


    try {

      logo_author = await page.evaluateHandle(`document.querySelector("#ViewsPageId-${pageId} > div:nth-child(2) > div.articlePage_gridLayout_aligned-DS-EntryPoint1-1.articlePage_gridLayout_5col-DS-EntryPoint1-1 > div.articlePage_gridarea_article-DS-EntryPoint1-1.articlePage_gridarea_article > div.articlePage_articleHeader-DS-EntryPoint1-1.viewsHeaderWrapper.viewsHeaderWrapperGradientMasthead > div:nth-child(3) > div > div > div > div > div > div > div > msnews-views-title").shadowRoot.querySelector("div.providerInfo.gradientBackground > div > div > a")`)
      const result_logo_author = await page.evaluateHandle(div => div["innerHTML"], logo_author);
      const logo_author_html = await result_logo_author.jsonValue()
      await result_logo_author.dispose(); // Click element
      const logoAuthor = cheerio.load(logo_author_html)
      const logo = logoAuthor("img").attr("src")
      const author = logoAuthor(".providerNameLarge").text()
      article.logo = logo
      article.creator = [author]

    } catch (err) {
      console.log("logo and author");

    }

    await page.close();
    return article

  }


  async newsLink(browser, language: string, links: any) {
    console.log('______category_______')

    async function autoScroll(page) {
      await page.evaluate(async () => {
        await new Promise((resolve: any) => {
          let totalHeight = 0;
          let distance = 100;
          let timer = setInterval(() => {
            let scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if ((totalHeight >= scrollHeight - window.innerHeight)) {
              clearInterval(timer);
              resolve();
            }
          }, 500);
        });
      });
    }

    let categories = [Object.keys(links)[0]]

    // categories.forEach(async (keyLink) => {
    let category = links[categories[0]]
    let url = `https://www.msn.com/${language}/${category}`
    let [page] = await browser.pages();
    let articles = []
    await page.goto(url, { waitUntil: ['networkidle0', "domcontentloaded", "load", "networkidle2"], timeout: 1000000 })
    try {
      let tsss
      tsss.fff
      // await autoScroll(page)
    } catch (error) {

      // document.querySelector("#root > div > div > div.contentContainer-DS-EntryPoint1-1 > grid-view-feed").shadowRoot.querySelector("div > div.feed > cs-super-container").shadowRoot.querySelector("cs-personalized-feed").shadowRoot.querySelector("cs-feed-layout:nth-child(11)").shadowRoot.querySelector("cs-article-card:nth-child(3)")
      // document.querySelector("#root > div > div > div.contentContainer-DS-EntryPoint1-1 > grid-view-feed").shadowRoot.querySelector("div > div.feed > cs-super-container").shadowRoot.querySelector("cs-personalized-feed").shadowRoot.querySelector("cs-feed-layout:nth-child(15)").shadowRoot.querySelector("cs-article-card:nth-child(2)")
      // document.querySelector("#root > div > div > div.contentContainer-DS-EntryPoint1-1 > grid-view-feed").shadowRoot.querySelector("div > div.feed > cs-super-container").shadowRoot.querySelector("cs-personalized-feed").shadowRoot.querySelector("cs-feed-layout:nth-child(6)").shadowRoot.querySelector("cs-article-card:nth-child(7)")
      let jsPath1 = (n: number) => `document.querySelector("#root > div > div > div.contentContainer-DS-EntryPoint1-1 > grid-view-feed").shadowRoot.querySelector("div > div.feed > cs-super-container").shadowRoot.querySelector("cs-personalized-feed").shadowRoot.querySelector("cs-feed-layout:nth-child(${n})")`
      let jsPath2 = `document.querySelector("#root > div > div > div.contentContainer-DS-EntryPoint1-1 > grid-view-feed").shadowRoot.querySelector("div > div.feed > cs-super-container").shadowRoot.querySelector("cs-personalized-feed").shadowRoot.querySelector("cs-feed-layout:nth-child(1)").shadowRoot.querySelector("cs-article-card:nth-child(4)")`
      let jsPath3 = `document.querySelector("#root > div > div > div.contentContainer-DS-EntryPoint1-1 > grid-view-feed").shadowRoot.querySelector("div > div.feed > cs-super-container").shadowRoot.querySelector("cs-personalized-feed").shadowRoot.querySelector("cs-feed-layout:nth-child(1)").shadowRoot.querySelector("cs-article-card:nth-child(2)")`
      for (const iterator of [...Array(100).keys()]) {
        try {

          const thePath1 = `${jsPath1(iterator)}.shadowRoot.querySelector("cs-article-card:nth-child(2)").shadowRoot.querySelector("cs-content-card")`
          let body1 = await page.evaluateHandle(thePath1);
          console.log("where is the error ___________");
          const resultHandle1 = await page.evaluateHandle(body => body["innerHTML"], body1);
          const htmlBody1 = await resultHandle1.jsonValue()
          await resultHandle1.dispose();  // Click element
          // console.log("htmlBody1__________________");
          const $1 = cheerio.load(htmlBody1)
          const metaData1 = $1("social-bar-wc").attr()
          let article1: any = await this.getNewsPage(metaData1.destinationurl, metaData1.contentid, browser)
          article1.category = [category]
          article1.title = metaData1.title
          article1.article_id = metaData1.contentid
          article1.link = metaData1.destinationurl
          article1.language = metaData1.locale
          articles.push(article1)

          const thePath2 = `${jsPath1(iterator)}.shadowRoot.querySelector("cs-article-card:nth-child(4)").shadowRoot.querySelector("cs-content-card")`
          let body2 = await page.evaluateHandle(thePath2);
          const resultHandle2 = await page.evaluateHandle(body => body["innerHTML"], body2);
          const htmlBody2 = await resultHandle2.jsonValue()
          await resultHandle2.dispose();  // Click element
          // console.log("htmlBody2__________________");
          const $2 = cheerio.load(htmlBody2)
          const metaData2 = $2("social-bar-wc").attr()
          let article2: any = await this.getNewsPage(metaData2.destinationurl, metaData2.contentid, browser)
          article2.category = [category]
          article2.title = metaData2.title
          article2.article_id = metaData2.contentid
          article2.link = metaData2.destinationurl
          article2.language = metaData2.locale
          articles.push(article2)



          const thePath3 = `${jsPath1(iterator)}.shadowRoot.querySelector("cs-article-card:nth-child(5)").shadowRoot.querySelector("cs-content-card")`
          let body3 = await page.evaluateHandle(thePath3);
          const resultHandle3 = await page.evaluateHandle(body => body["innerHTML"], body3);
          const htmlBody3 = await resultHandle3.jsonValue()
          await resultHandle3.dispose();  // Click element
          // console.log("htmlBody3__________________");
          const $3 = cheerio.load(htmlBody3)
          const metaData3 = $3("social-bar-wc").attr()
          let article3: any = await this.getNewsPage(metaData3.destinationurl, metaData3.contentid, browser)
          article3.category = [category]
          article3.title = metaData3.title
          article3.article_id = metaData3.contentid
          article3.link = metaData3.destinationurl
          article3.language = metaData3.locale
          articles.push(article3)



          const thePath4 = `${jsPath1(iterator)}.shadowRoot.querySelector("cs-article-card:nth-child(7)").shadowRoot.querySelector("cs-content-card")`
          let body4 = await page.evaluateHandle(thePath4);
          const resultHandle4 = await page.evaluateHandle(body => body["innerHTML"], body4);
          const htmlBody4 = await resultHandle4.jsonValue()
          await resultHandle4.dispose();  // Click element
          // console.log("htmlBody4__________________");
          const $4 = cheerio.load(htmlBody4)
          const metaData4 = $4("social-bar-wc").attr()
          let article4: any = await this.getNewsPage(metaData4.destinationurl, metaData4.contentid, browser)
          article4.category = [category]
          article4.title = metaData4.title
          article4.article_id = metaData4.contentid
          article4.link = metaData4.destinationurl
          article4.language = metaData4.locale
          articles.push(article4)



          const thePath5 = `${jsPath1(iterator)}.shadowRoot.querySelector("cs-article-card:nth-child(8)").shadowRoot.querySelector("cs-content-card")`
          let body5 = await page.evaluateHandle(thePath5);
          const resultHandle5 = await page.evaluateHandle(body => body["innerHTML"], body5);
          const htmlBody5 = await resultHandle5.jsonValue()
          await resultHandle5.dispose();  // Click element
          // console.log("htmlBody5__________________");
          const $5 = cheerio.load(htmlBody5)
          const metaData5 = $5("social-bar-wc").attr()
          let article5: any = await this.getNewsPage(metaData5.destinationurl, metaData5.contentid, browser)
          article5.category = [category]
          article5.title = metaData5.title
          article5.article_id = metaData5.contentid
          article5.link = metaData5.destinationurl
          article5.language = metaData5.locale
          articles.push(article5)






        } catch (error) {
          // console.log(iterator);

        }
      }
      await page.close();
      console.log(articles);

      return articles

    }
    // })
    return {}
  }
}
