import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c776c6876a8144bbb3ca5ef6498ab51f&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: true,
      totalResults: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("Previous Clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=c776c6876a8144bbb3ca5ef6498ab51f&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      loading: true,
      page: this.state.page - 1,
    });
  };
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=c776c6876a8144bbb3ca5ef6498ab51f&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        loading: true,
        page: this.state.page + 1,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">Monkeybite - Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title === null ? "" : element.title}
                  description={
                    element.description === null ? "" : element.description
                  }
                  imageUrl={
                    element.urlToImage ||
                    "https://bl-i.thgim.com/public/incoming/7681di/article68316043.ece/alternates/LANDSCAPE_1200/IMG_iStock-1268669581.jp_2_1_0EB95CDN.jpg"
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
