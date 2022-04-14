import axios from 'axios';
import React, { Component } from 'react'
import ReactPaginate from 'react-paginate';
import './App.css'

class App extends Component{
  constructor(props) {

    super(props);

    this.state = {
      offset : 0,
      data : [],
      perPage : 10,
      currentPage : 0
    }
  }

  receivedData(){
    axios.get(`https://jsonplaceholder.typicode.com/photos`)
    .then((response) => {
      const data = response.data
      this.setState ({
        data : data
      })
      console.log(this.state.data)
      this.displayDataOnScreen()
    })
  }

  displayDataOnScreen = () => {
    const slice = this.state.data.slice(this.state.offset, this.state.offset + this.state.perPage)
    console.log(slice)
      const postData = slice.map ((item, index) => {
        return(
          <React.Fragment key = {index}>
          <p>{item.title}</p>
          <img src = {item.thumbnailUrl} alt = {item.title} />
        </React.Fragment>
        )  
      })

      this.setState({
        pageCount : Math.ceil(this.state.data.length / this.state.perPage),
        postData 
      })
  }

  handlePageClick = (event) => {
    const selectedPage = event.selected
    const offset = selectedPage * this.state.perPage

    this.setState ({
      offset : offset,
      currentPage : selectedPage
    })

    this.displayDataOnScreen()
  }

  componentDidMount () {
    this.receivedData()
  }

  render(){

    return(
        <>
          {this.state.postData}
          <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
        </>
    )
  }
}

export default App