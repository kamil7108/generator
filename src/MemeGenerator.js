import React from 'react'
class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
        topText:'',
        bottomText:'',
        imgsSrc:[],
        activeurl:"http://i.imgflip.com/1bij.jpg"
        }
        this.changeHandeler = this.changeHandeler.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes)
            this.setState({imgsSrc:memes})
        })
    }

    changeHandeler(Event){
        const {name,value} = Event.target
        this.setState({[name]: value})
    }

    submit(Event){
        Event.preventDefault()
        const rand = Math.floor(Math.random() *  this.state.imgsSrc.length)
        const url = this.state.imgsSrc[rand].url
        console.log(url)
        this.setState({activeurl: url})
        
    }

    render(){
        return (
            <div>
                <form className = "meme-form" onSubmit = {this.submit} >
                    <input 
                    type = "text"
                    name = "topText"
                    placeholder = "Top Text" 
                    value = {this.state.topText}
                    onChange = {this.changeHandeler}
                    />
                    <input 
                    type = "text"
                    name = "bottomText"
                    placeholder = "Bottom Text" 
                    value = {this.state.bottomText}
                    onChange = {this.changeHandeler}
                    />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src = {this.state.activeurl} alt ="UPS"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}




export default MemeGenerator