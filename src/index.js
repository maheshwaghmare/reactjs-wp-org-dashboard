import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*class ThemePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="theme-preview">
        <h2>{this.props.item.name}</h2>
        <p>{this.props.item.version}</p>
      </div>
    )
  }
}*/

class Theme extends React.Component {
  constructor(props) {
    super(props);
  }

  showPreview = () => {
    console.log( this.props.item );
    // <ThemePreview item={this.props.item} />
  }

  render() {
    return (
      <li className="theme" onClick={this.showPreview}>
         <div className="inner">
          <div className="content">
            <h6>{this.props.item.name} <span className="author">{this.props.item.author}</span></h6>
            <p className="version">{this.props.item.version}</p>
          </div>
        </div>
        {/*<p>{this.props.item.slug}</p>
        <p>{this.props.item.preview_url}</p>
        <p>{this.props.item.author}</p>
        <p>{this.props.item.screenshot_url}</p>
        <p>{this.props.item.rating}</p>
        <p>{this.props.item.num_ratings}</p>
        <p>{this.props.item.homepage}</p>*/}
        {/*<p>{this.props.item.description}</p>*/}
      </li>
    );
  }
}

class Plugin extends React.Component {
  constructor(props) {
    super(props);
  }

  showPreview = () => {
    console.log( this.props.item );
    // <ThemePreview item={this.props.item} />
  }

  render() {
    let author = this.props.item.author_profile.replace('https://profiles.wordpress.org/', '');
    return (
      <li className="theme" onClick={this.showPreview}>
         <div className="inner">
          <div className="content">
            <h6>{this.props.item.name} <span className="author">{author}</span></h6>
            <p className="version">{this.props.item.version}</p>
          </div>
        </div>
        {/*<p>{this.props.item.slug}</p>
        <p>{this.props.item.preview_url}</p>
        <p>{this.props.item.author}</p>
        <p>{this.props.item.screenshot_url}</p>
        <p>{this.props.item.rating}</p>
        <p>{this.props.item.num_ratings}</p>
        <p>{this.props.item.homepage}</p>*/}
        {/*<p>{this.props.item.description}</p>*/}
      </li>
    );
  }
}

class SupportArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="theme">
         <div className="inner">
          <div className="content">
            <h6>{this.props.item.title}</h6>
          </div>
        </div>
      </li>
    );
  }
}

class Plugins extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.plugins;
    let plugins = result.plugins || {};
    console.log( plugins );
    return (
      <ul className="plugins">
      { Object.keys( plugins ).map( (key) => <Plugin item={plugins[key]} key={key} /> ) }
      </ul>
    );
  }
}

class Themes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.themes;
    let themes = result.themes || {};
    return (
      <ul className="themes">
      { Object.keys( themes ).map( (key) => <Theme item={themes[key]} key={key} /> ) }
      </ul>
    );
  }
}

class SupportArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.articles;
    return (
      <ul className="themes">
      { Object.keys( result ).map( (key) => <SupportArticle item={result[key]} key={key} /> ) }
      </ul>
    );
  }
}


class Code extends React.Component {
  constructor(props) {
    super(props);
  }

  showPreview = () => {
    console.log( this.props.item );
    // <ThemePreview item={this.props.item} />
  }

  render() {
    console.log( this.props.item );
    // let author = this.props.item.author_profile.replace('https://profiles.wordpress.org/', '');
    return (
      <li className="theme" onClick={this.showPreview}>
         <div className="inner">
          <div className="content">
            <h6>{this.props.item.title.rendered}</h6>
          </div>
        </div>
      </li>
    );
  }
}

class CodeBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let result = this.props.data || '';
    // let data = result.data || {};
    console.log( '----------data' );
    console.log( result );
    if( ! result ) {
      return (
        <div>
        </div>
      )
    }

    return (
      <ul className="themes">
      { Object.keys( result ).map( (key) => <Code item={result[key]} key={key} /> ) }
      </ul>
    );
  }
}

class ThemesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      search_term : '',
      themes : [],
      newThemes : [],
      popularThemes : [],

      popularPlugins : [],
      newPlugins : [],
      blockPlugins : [],

      functions : [],
      classes : [],
      methods : [],
      hooks : [],

      supportArticles : [],
    }
  }
  // onChange = ( search ) => {
  //   this.setState( { search } );
  // };
  
  initialLoadSites = () => {
    fetch( 'http://api.wordpress.org/themes/info/1.1/?action=query_themes&request[browse]=popular&request[per_page]=10' ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          themes : data,
          popularThemes : data,
          search_term: '',
        } );
      });

    fetch( 'http://api.wordpress.org/themes/info/1.1/?action=query_themes&request[browse]=new&request[per_page]=10' ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          newThemes : data,
        } );
      });

      fetch( 'https://api.wordpress.org/plugins/info/1.1/?action=query_plugins&request[browse]=popular&request[per_page]=10' ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          popularPlugins : data,
        } );
      });

      fetch( 'https://api.wordpress.org/plugins/info/1.1/?action=query_plugins&request[browse]=new&request[per_page]=10' ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          newPlugins : data,
        } );
      });

      fetch( 'https://api.wordpress.org/plugins/info/1.1/?action=query_plugins&request[browse]=block&request[per_page]=10' ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          blockPlugins : data,
        } );
      });

      fetch( 'https://developer.wordpress.org/wp-json/wp/v2/wp-parser-function?wp-parser-since=941&_fields=title,link&per_page=10' ).then(response => {
        return response.json();
      }).then(data => {
        this.setState( {
          functions: data,
        } );
      });

      fetch( 'https://developer.wordpress.org/wp-json/wp/v2/wp-parser-class/?wp-parser-since=941&_fields=title,link&per_page=10' ).then(response => {
        return response.json();
      }).then(data => {
        this.setState( {
          classes: data,
        } );
      });

      fetch( 'https://developer.wordpress.org/wp-json/wp/v2/wp-parser-method/?wp-parser-since=941&_fields=title,link&per_page=10' ).then(response => {
        return response.json();
      }).then(data => {
        this.setState( {
          methods: data,
        } );
      });

      fetch( 'https://developer.wordpress.org/wp-json/wp/v2/wp-parser-hook/?wp-parser-since=941&_fields=title,link&per_page=10' ).then(response => {
        return response.json();
      }).then(data => {
        this.setState( {
          hooks: data,
        } );
      });

      fetch( 'https://wordpress.org/support/wp-json/wp/v2/search/?subtype=helphub_article&_fields=id,title,url,subtype,type&per_page=10' ).then(response => {
        return response.json();
      }).then(data => {
        this.setState( {
          supportArticles: data,
        } );
      });
            
  }

  componentDidMount = () => {
    this.initialLoadSites()
  }
  // componentWillUpdate = () => {
  //   console.log( 'mount' + this.state.search_term );
  // }

  searchTheme = ( event ) => {
    let search_term = event.target.value;
    if( event.target.value ) {
      fetch( 'http://api.wordpress.org/themes/info/1.1/?action=query_themes&request[search]=' + event.target.value ).then(response => {
        return response.json();
      }).then(data => {

        console.log( data );
        this.setState( {
          popularThemes : data,
          themes : data,
          search_term: search_term,
        } );
      });
    } else {
      this.initialLoadSites()
    }
    // console.log( event.target.value );
  }

  searchTermBox = () => {
    const isShow = this.state.search_term ? true : false;
    if( isShow ) {
      return <p>Search for <code>{this.state.search_term}</code></p>;
    }

    return '';
  }

  render() {
    return (
      <div className="section-wrap">
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4 mt-5">WordPress Themes</h2>
              <p>Below is the list of <code>new</code> and <code>popular</code> themes.</p>
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>New</h5>
                {/*<input type="search" className="search-input form-control" placeholder="Search.." onChange={this.searchTheme} />*/}
                {/* this.searchTermBox() */}
              </div>
              <Themes themes={this.state.newThemes} />
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Popular</h5>
                {/*<input type="search" className="search-input form-control" placeholder="Search.." onChange={this.searchTheme} />*/}
                {/* this.searchTermBox() */}
              </div>
              <Themes themes={this.state.popularThemes} />
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
      </div>
      <div className="section  py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4">WordPress Plugins</h2>
              <p>Below is the list of <code>new</code>, <code>popular</code> and <code>block</code> plugins.</p>
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>New</h5>
                {/*<input type="search" className="search-input form-control" placeholder="Search.." onChange={this.searchTheme} />*/}
                {/* this.searchTermBox() */}
              </div>
              <Plugins plugins={this.state.newPlugins} />
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Popular</h5>
                {/*<input type="search" className="search-input form-control" placeholder="Search.." onChange={this.searchTheme} />*/}
                {/* this.searchTermBox() */}
              </div>
              <Plugins plugins={this.state.popularPlugins} />
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Blocks</h5>
                {/*<input type="search" className="search-input form-control" placeholder="Search.." onChange={this.searchTheme} />*/}
                {/* this.searchTermBox() */}
              </div>
              <Plugins plugins={this.state.blockPlugins} />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4 mt-5">Support</h2>
              <p>Below are the latest support <code>articles</code>.</p>
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Articles</h5>
                <SupportArticles articles={this.state.supportArticles} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-4 mt-5">Developers</h2>
              <p>Below is the <code>functions</code>, <code>classes</code>, <code>methods</code> and <code>hooks</code> in WordPress version <kbd>5.2.0</kbd></p>
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Classes</h5>
              </div>
              <CodeBox data={this.state.classes} />
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Functions</h5>
              </div>
              <CodeBox data={this.state.functions} />
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Methods</h5>
              </div>
              <CodeBox data={this.state.methods} />
            </div>
            <div className="col-md-4">
              <div className="header">
                <h5>Hooks</h5>
              </div>
              <CodeBox data={this.state.hooks} />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ThemesContainer />,
  document.getElementById('root')
);
