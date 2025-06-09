import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Readability } from '@mozilla/readability';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ArrayContains, Equal, Like, Repository, Not } from 'typeorm';
import { findDto } from 'src/utils/dto/findDto';
import { calculatePagination } from 'src/utils/pagination/globalFilters';
import { ApiResponse } from 'src/utils/api-response/api-response';
import { FindPostDto } from './dto/find-post.dto';
import { newsDataIo_categories } from './reStructureApis/newsDataIo-api';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Gnews_categories } from './reStructureApis/gnews-api';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const newsDataIoApiKey = `pub_328785fb4978b4ac33962796ebdfb94b4b52d`
const apikey = '2fd5771df96392ec22ca698e0ce35eab';
const subKey3 = '46108d02-e18a-44fe-8086-40182011c8ac'
const worldNewsApiKey = "78285c7db6124c0e807b5971f1f8fdb5"
const theNewsWorldApiKey = "uHW0VlVtBzZ67zgMhTHPPTyyapJKHgqXLAFmjmJy"

const subKey1 = "87f24e8d233f41caa16709c7c749add4"
const subKey2 = "880b6a12de49414394822f4184df1bc4"
// const url = "https://www.msn.com/ar-ae/news/other/%D8%B9%D8%A7%D9%84%D9%82%D9%88%D9%86-%D9%81%D9%8A-%D8%A7%D9%84%D8%B6%D9%81%D8%A9-%D9%85%D9%86-%D9%8A%D8%B1%D9%8A%D8%AF-%D8%A7%D9%84%D8%B9%D9%88%D8%AF%D8%A9-%D8%A5%D9%84%D9%89-%D8%BA%D8%B2%D8%A9/ar-AA1jHlCn"
const url = `https://www.msn.com/ar-eg/news/national/%D8%A7%D9%84%D9%85%D8%B1%D9%88%D8%B1-%D9%81%D8%AA%D8%AD-%D8%B7%D8%B1%D9%8A%D9%82-%D8%A7%D9%84%D8%B9%D9%8A%D9%86-%D8%A7%D9%84%D8%B3%D8%AE%D9%86%D8%A9-%D8%A8%D8%B9%D8%AF-%D8%A7%D9%86%D9%82%D8%B4%D8%A7%D8%B9-%D8%A7%D9%84%D8%B4%D8%A8%D9%88%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%A7%D8%A6%D9%8A%D8%A9/ar-AA1jTIFQ?ocid=msedgdhphdr&cvid=3fb260c1cefe413fafaf3e7217b71c23&ei=11`

const mediaStackApiKey = '936ed574d9e6b7b1298d82444a59b4a5'
const newsApiKey = 'cfb0092be8ee460f898fd3e50e34027e'
const newsApiAiKey = '3ea8597c-9c85-436d-bb7d-2dedc8c8bc73'



@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    // @Inject(REQUEST) private request: Request
  ) { }

  async create(articles: CreatePostDto[]) {
    // const { results }: { results: CreatePostDto[] } = await (await fetch(`https://newsdata.io/api/1/news?${new URLSearchParams({ apikey: newsApiKey, ...apiQuery as any })}`, { cache: "no-cache" })).json()
    await this.postRepository.upsert(articles, { conflictPaths: { title: true }, upsertType: 'on-conflict-do-update', skipUpdateIfNoValuesChanged: true })
  }

  async findAll(query: FindPostDto, request) {
    let { page, limit, search = '', withDeleted = false, order = { id: 'DESC' }, orderKey, orderValue, ...filter } = query;
    let current_page = page
    let pagination = {};
    filter = {}
    if (!query.category) query.category = undefined
    if (query.category) filter.category = ArrayContains([query.category.toLowerCase()])

    if (!query.country || query.country == "undefined") query.country = JSON.stringify({ code: "EG", name: "egypt" })
    const theCountry = JSON.parse(query.country)

    if (theCountry.code) filter.country = ArrayContains([theCountry.code.toLowerCase()])
    const onePost = await this.postRepository.findOne({ order, where: { country: ArrayContains([theCountry.code.toLowerCase()]) } })
    // if (new Date(onePost?.created_at).toLocaleDateString() != new Date().toLocaleDateString()) {
    let apiQuery: any = {}
    if (theCountry.name) apiQuery.country = theCountry.code
    if (query.category) apiQuery.category = query.category
    // await this.create(apiQuery)
    // }
    if (current_page && limit)
      pagination = { take: +limit, skip: (current_page - 1) * +limit };
    const [records, total] = await this.postRepository.findAndCount({
      relationLoadStrategy: "join",
      relations: {
        immotions: true
      },
      where: [
        {
          content: Like(`%${search}%`),
          ...filter

        },
        {
          title: Like(`%${search}%`),
          ...filter

        }
      ],
      withDeleted,
      ...pagination,
      order
    });
    let meta = calculatePagination(limit, total, current_page);
    return ApiResponse.findWithMeta("en", "success", "OK", meta, this.restructure(records, request.user["id"]));
  }

  async findOne(id: number, request) {
    const post = await this.postRepository.findOne({
      relations: {
        immotions: true
      },
      where: { id }
    });
    post.immotions.forEach(immotion => {
      post.watches++
      if (immotion.like == 1) post.likes++
      if (immotion.like == 2) post.dislikes++
      if (immotion.comment) post.comments++
      if (immotion.shared) post.shareds++
      if (immotion.user_id == request.user["id"]) {
        post.like = immotion.like
      }
    })

    return ApiResponse.successResponse("en", "success", "OK", post)
  }


  async findApiTest() {

    const gnews_apikey = "2fd5771df96392ec22ca698e0ce35eab"
    // gnews_apikey_array.push(gnews_apikey_array.shift());

    const apiQuery = {
      // q: "q=mt+rainier",
      // category: "nation",
      country: "eg",
      apikey: gnews_apikey,
      page: 1,
      expand: "content",
      // lang: "ar",
      max: 100,
    }
    //?w="100%"&h="100%"
    let url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ category: Gnews_categories.nation, ...apiQuery as any })}`
    const { articles: artticles_nation } = await (await fetch(url, { cache: "no-cache" })).json()

    // const apiQuery = {
    //   // "locale": "eg",
    //   // "language": "ar",
    //   // mkt: "ar-eg",
    //   // q: "q=mt+rainier",
    //   // categories: "health",
    //   "apiKey": newsDataIoApiKey,
    //   country: "eg"
    //   // categories: "politics",
    //   // keywords: "gaza"
    //   // language: "ar",
    //   // max: 25,
    // }
    // //?w="100%"&h="100%"
    // const url = `https://newsdata.io/api/1/news?${new URLSearchParams({ ...apiQuery as any })}`
    // // const url = `https://gnews.io/api/v4/top-headlines?${new URLSearchParams({ apikey: apikey, ...apiQuery as any })}`
    // // const url = `https://newsapi.org/v2/top-headlines??${new URLSearchParams({ ...apiQuery as any })}`
    // // const url = `http://api.mediastack.com/v1/news?${new URLSearchParams({ ...apiQuery as any })}`
    // // const url = `https://api.bing.microsoft.com/v7.0/news?${new URLSearchParams({ ...apiQuery as any })}`

    // const data = await (await fetch(url, { cache: "no-cache", headers: { "Ocp-Apim-Subscription-Key": subKey1 } })).json()
    // const articles = await newsLink(`https://www.msn.com/ar-eg/news`, "news", [])
    // if (!post) return ApiResponse.notFoundResponse("en", "NOTFOUND");
    return ApiResponse.successResponse("en", "success", "OK", artticles_nation)
  }




  // async findOne(id: number) {
  //   const reponse = await (await fetch(`https://newsdata.io/api/1/news?apikey=${newsApiKey}`)).json()
  //   // const response = await (await fetch(`https://api.bing.microsoft.com/v7.0/news/search?q=gaza`, {
  //   //   headers: {
  //   //     "Ocp-Apim-Subscription-Key": subKey1
  //   //   }
  //   // })).json()
  //   // const html = await (await fetch(url, {
  //   // })).text()
  //   // console.log(html);

  //   // let dom = new JSDOM(html, {
  //   //   url: url
  //   // });
  //   // let article = new Readability(dom.window.document).parse();
  //   // console.log(dom);


  //   // await getNewsPage(url, "AA1jTIFQ")

  //   return reponse;
  // }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  restructure(posts: Post[], userId) {


    posts.forEach((post: Post) => {
      post.watches++
      post.immotions.forEach(immotion => {
        if (immotion.like == 1) post.likes++
        if (immotion.like == 2) post.dislikes++
        if (immotion.comment) post.comments++
        if (immotion.shared) post.shareds++
        if (immotion.user_id == userId) {
          post.like = immotion.like
        }
      })

    })
    return posts
  }
}
