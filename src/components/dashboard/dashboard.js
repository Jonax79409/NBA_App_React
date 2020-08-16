import React, { Component } from  'react';
import styles from './dashboard.module.css'
import FormField from '../Widgets/FormFields/FormFields.js';
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase.js';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState }  from 'draft-js';
//import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html';
import Uploader from '../Widgets/FileUploader/fileUploader.js'


class Dashboard extends Component {
    state = {
        edditorState: EditorState.createEmpty(),
        postError: '',
        loading:false,
        formData:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder: 'Enter your Name'
                },
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder: 'Enter the title'
                },
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            body:{
                element:'textEditor',
                value:'',
                valid:true
            },
            image:{
                element:'image',
                value:'',
                valid:true
            },
            teams:{
                element:'select',
                value:'',
                config:{
                    name:'teams_input',
                    options:[]
                },
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }

    }
    componentDidMount() {
        this.loadTeams()
    }

    loadTeams = () => {
        firebaseTeams.once('value')
        .then((snapshot) => {
            let teams=[];

            snapshot.forEach((childSnapshot) => {
                teams.push({
                    id: childSnapshot.val().teamId,
                    name:childSnapshot.val().city
                })
            })

            const newFormData = {
                ...this.state.formData
            }
            const newElement = {...newFormData['teams']};

            newElement.config.options = teams;
            newFormData['teams'] = newElement

            this.setState({
                formData:newFormData
            })
            
        })

    }
    updateForm = (element,content='') => {
        const newFormData = {
            ...this.state.formData
        }
        const newElement = {
            ...newFormData[element.id]
        }

        if (content === '') {
            newElement.value = element.event.target.value;
        }
        else {
            newElement.value = content
        }


        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;
        
        this.setState({
            formData:newFormData
        })        
    }
    validate = (element) => {
        let error = [true,'']

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`;
            error = !valid ? [valid,message] : error
        }

        return error;
    }

    submitButton = () => (
        this.state.loading ? 
            'loading...'
        :
        <div>
            <button type="Submit"> Add Post </button>
        </div>
    )

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
            let formIsValid = true;

        for(let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }
        for(let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            this.setState ({
                loading:true,
                postError:''
            })

            firebaseArticles.orderByChild("id")
            .limitToLast(1).once('value')
            .then ((snapshot) => {
                let articleId = null;
                snapshot.forEach((childSnapshot) => {
                    articleId = childSnapshot.val().id
                });

                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSubmit['id'] = articleId + 1;
                dataToSubmit['teams'] = parseInt(dataToSubmit['teams'])

                firebaseArticles.push(dataToSubmit)
                .then (article => {
                    this.props.history.push(`/articles/${article.key}`)
                }).catch ((e) => {
                    this.setState ({
                        postError : e.message
                    })
                })
            })
        } else {
            this.setState ({
                postError: 'Something went wrong'  
            })
        }
    }

    showError = () => (
        this.state.postError !== '' ?
            <div className={styles.error}>{this.state.postError}</div>
        :
        ''
    )

    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        //let rawState = convertToRaw(contentState)

        let html = stateToHTML(contentState);

        this.updateForm({id:'body'},html)

        this.setState ({
            editorState
        })
    }

    storeFilename = (filename) => {
        this.updateForm ({id:'image'},filename)
    }

    render () {
        return (
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>

                    <Uploader
                        filename={ (filename) => this.storeFilename(filename) }
                    />

                    <FormField 
                        id={'author'}
                        formData={this.state.formData.author}
                        change={(element)=>this.updateForm(element)}
                    />

                    <FormField 
                        id={'title'}
                        formData={this.state.formData.title}
                        change={(element)=>this.updateForm(element)}
                    />

                    <Editor 
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange}

                    />

                    <FormField 
                        id={'teams'}
                        formData={this.state.formData.teams}
                        change={(element)=>this.updateForm(element)}
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Dashboard;