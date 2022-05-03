import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
// import PropTypes from 'prop-types';

class News extends Component {

  // static defaultProps = {
  //   country:'in',
  //   pageSize:8,
  //   category:'general',
  // }
  // static propTypes = {
  //   country:PropTypes.string,
  //   pageSize:PropTypes.number,
  //   category:PropTypes.string
  // }
  constructor(){
    super();
    this.state={
    articles:[],
    loading:false,
    page:1,
    }
  }
  

 async componentDidMount(){
  console.log("cdm");
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=bdba3cd25c934f378ca4d7444a73d1f8&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  console.log(data);
  let parsedData=await data.json();
  console.log(parsedData);
  this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false});
  
}



handleNextClick=async()=>{
  console.log("cdm");
  if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

  }
  else{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=bdba3cd25c934f378ca4d7444a73d1f8&page=${this.state.page +1} &pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  console.log(data);
  let parsedData=await data.json();
  //this.setState({loading:false});
  //this.setState({articles:parsedData.articles});
  console.log("vfhsgh");
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles,
    loading:false
    
  })
}


}
handlePrevClick=async()=>{
  console.log("cdm");
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=bdba3cd25c934f378ca4d7444a73d1f8&page=${this.state.page -1} &pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  console.log(data);
  let parsedData=await data.json();
  console.log(parsedData);
  //this.setState({articles:parsedData.articles});
  console.log("vfhsgh");
  this.setState({
    page:this.state.page-1,
    articles:parsedData.articles,
    loading:false
    
  })

}



  render() {
    // console.log('render')


    return (
    <div className='container my-3'>
      
        
         <h1 className="text-center"  style={{margin: "35px 0px"}}>Daily-News Top Headlines</h1>
         {this.state.loading && <Spinner/>}
         <div className='row'>
 
     {!this.state.loading &&this.state.articles.map((element) => {
          return  <div className='col-md-4'
            key={element.url}>
  
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>

      })};
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
     </div> 
     )
   }
 }
 export default News

