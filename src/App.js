import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1><a href="/" onClick={function(ev) {
          ev.preventDefault();
          this.props.onClick();
        }.bind(this)}>{this.props.title}</a></h1>
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
      let data = this.props.data[i];
      list.push(
      <li key={data.id}>
        <a href={data.id + '.html'} onClick={function(id, ev) {
          ev.preventDefault()
          this.props.onSelected(id);
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

class ContentCreate extends Component {
  state = {
    title: '',
    desc: ''
  }

  changeFormHandler(ev){
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render() {
    return (
      <article>
        <form onSubmit={function(ev){
          ev.preventDefault();
          this.props.onSubmit(this.state);
        }.bind(this)}>
          <p><input type="text" placeholder='title' name="title" value={this.state.title} onChange={this.changeFormHandler.bind(this)}></input></p>
          <p><textarea placeholder="description" name="desc" value={this.state.desc} onChange={this.changeFormHandler.bind(this)}></textarea></p>
          <p><input type="submit"></input></p>
        </form>
      </article>
    );
  }
}

class App extends Component {
  last_content_id = 3;
  state = {
    mode: 'read',
    selected_content_id: 3,
    contents: [
      {id: 1, title: 'HTML', desc: 'HTML is for information'},
      {id: 2, title: 'CSS', desc: 'CSS is for style'},
      {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactiono'}
    ]
  }

  getSelectedContent() {
    let i = 0;
    while(i < this.state.contents.length) {
      let data = this.state.contents[i]
      if(this.state.selected_content_id === data.id) {
        return data;
      }
      i = i + 1;
    }
  }

  getContentComponent() {
    if(this.state.mode === 'read') {
      return <Content data={this.getSelectedContent()}></Content>
    } else if (this.state.mode === 'welcome') {
      return (
      <Content data={{
        title: 'Welcome',
        desc: 'Hello, React!!!'
      }}>        
      </Content>
    )  
    } else if (this.state.mode === 'create') {
      return <ContentCreate onSubmit={function(formData){
        console.log(formData);
        this.last_content_id = this.last_content_id + 1;
        formData.id = this.last_content_id;
        let newContents = Object.assign([], this.state.contents);
        newContents.push(formData);
        this.setState({
          contents: newContents,
          selected_content_id: this.last_content_id,
          mode:'read'
        })
      }.bind(this)}></ContentCreate>
    }
  }

  getControlComponent() {
    return [
      <a key="1" href='/create' onClick={function(ev) {
        ev.preventDefault();
        this.setState({
          mode: 'create'
        })
      }.bind(this)}>create</a>,
      <a key="2" href='/update' onClick={function(ev) {
        ev.preventDefault();
        
      }.bind(this)}>update</a>,
      <input key="3" type="button" href="/delete" onClick={function(){
        var newContents = this.state.contents.filter(function(el){ 
          if(el.id !== this.state.selected_content_id) {
            return el;
          }
          }.bind(this));
       this.setState({
        contents: newContents,
        mode: 'welcome'
       });
      }.bind(this)} value="delete"></input>,
    ];
  }
  
  render() {
    let content = this.getSelectedContent();
    console.log(content);
  return (
    <div className="App">
      <Subject onClick={function() {
        this.setState({
          mode: 'welcome'
        })
      }.bind(this)} title="WEB" sub="World wide web"></Subject>
      <TOC onSelected={function(id) {
        this.setState({
          selected_content_id: id,
          mode: 'read'
      })
      }.bind(this)}  data={this.state.contents}></TOC>
      
      {this.getControlComponent()}
      {this.getContentComponent()}
    </div>
  )
}
}

export default App;
