import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {editItem} from '../actions/itemActions';

class ItemEditModal extends Component {
   state= {
       modal : false,
       key: '',
       name : ''
   }
   componentDidMount() {
    //console.log('componentDidMount ... ');
    //console.log(this.state ,this.props);
   }
   toggle = () => {
       this.setState( {
           modal : !this.state.modal,
           key: this.state.key,
           name: this.state.name
       })
   }

   onChange = (e) => {
    console.log('change ... ', e.target.name, e.target.value);
    this.setState({
        [e.target.name] : e.target.value
    })
   }

   onEditClick = ( id, name) => {
    this.toggle();
    
    }

   onSubmit = (e) => {
    //e.preventDefault();
       console.log('submitting ... ', e.target, this.state)
       const changeItem = {
        name: this.state.name
        };

    let id = this.props.id
    this.props.editItem(id, changeItem.name);
    this.toggle();

   }
  render() {
      
      let key = this.props.id;
      let name = this.props.name;
      //console.log(this.props, key, name);
    return (
      <div>
        <Button
            className="btn-mini"
            color="inverse"
            size="sm"
            name="id"
            id="key"
            onClick={this.onEditClick.bind(this,key, name)}>
            Edit
        </Button>
        <Modal isOpen={this.state.modal}
        toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>
        Edit Item to Shopping List</ModalHeader>
        <ModalBody>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="item">Item</Label>
                    <Input type="text" name="name" id="item" placeholder={name} 
                    onChange={this.onChange}/>
                    <Button color="dark"
                    style={{marginTop: '2rem'}}
                    block> Update Item </Button>
                </FormGroup>
            </Form>
        </ModalBody>
        </Modal>        
      </div>
    )
  }
}

const mapStateToProps = state => ( {
    item: state.item
});

export default connect(mapStateToProps, {editItem})(ItemEditModal);
