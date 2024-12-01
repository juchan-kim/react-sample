import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    )
  }
}

class TOC extends Component {
  render() {
    
    const list = [];
    let i = 0;
    while (i < this.props.data.length) {
      const data = this.props.data[i];
      list.push(
      <li key={data.id}>
        <a href={data.id + '.html'} onClick={function(id, ev) {
          ev.preventDefault()
          this.props.onSelect(id);
        }.bind(this, data.id)}>{data.title}          
        </a>
      </li>
      );
      i++;
    }
     
    /*
    const list = this.props.data.map(el => (<li><a href="1.html">{el.title}</a></li>));  
    */
    return (
      <nav>
        <ol>
            {list}
        </ol>
      </nav>
    )
  }
}

class Content extends Component {
  render() {
    return (
    <article>
      <h2>{this.props.data.title}</h2>
      {this.props.data.desc}
    </article>
    )
  }
}

class App extends Component {
  state = {
    selected_content_id: 2,
    contents: [
      {id: 1, title: 'HTML', desc: 'HTML is for information'},
      {id: 2, title: 'CSS', desc: 'CSS is for style'},
      {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactiono'}
    ]
  }

  getSelectedContent() {
    let i = 0;
    while(i < this.state.contents.length) {
      const data = this.state.contents[i]
      if(this.state.selected_content_id === data.id) {
        return data;
      }
      i = i + 1;
    }
  }

  render() {
    let content = this.getSelectedContent();
    console.log(content);
  return (
    <div className="App">
      <Subject title="WEB" sub="World wide web"></Subject>
      <TOC onSelect={function(id) {
        console.log('app', id);
        this.setState({
          selected_content_id: id
      })
      }.bind(this)}  data={this.state.contents}></TOC>
      <Content data={this.getSelectedContent()}></Content>
    </div>
  )
}
}

export default App;
