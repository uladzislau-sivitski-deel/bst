'use strict';

class BinaryTree {

	constructor() {
		this.root = null;
	}

	insert(data) {

		var root = this.root;

		if (!root) {
			this.root = new Node(data);
			return;
		}

		var currentNode = root,
			newNode = new Node(data);

		while(currentNode){
      		if(data < currentNode.data){
        		if(!currentNode.left){
             		currentNode.left = newNode;
             		break;
          		}

            	else{
             		currentNode = currentNode.left;
        		}
     		}

     		else{

         		if(!currentNode.right){
            		currentNode.right = newNode;
            		break;
         		}

         		else{
            		currentNode = currentNode.right;
         		}
     		}
  		}
	}

	contains(data) {

		var found = false,
		 	currentNode = this.root;

		while(!found && currentNode){
			if (data < currentNode.data){
				currentNode = currentNode.left;
			}

			else if (data > currentNode.data){
				currentNode = currentNode.right;
			}

			else {
				found = true;
			}

		}

		return found;
	}

	 remove(data) {
        this.root = this.removeInner(data, this.root);
    }

    removeInner(data, node) {
        if (node) {
            if (data < node.data) {
                node.left = this.removeInner(data, node.left);
            } else if (data > node.data) {
                node.right = this.removeInner(data, node.right);
            } else if (node.left && node.right) {
                node.data = this.findMinValue(node.right);
                node.right = this.removeInner(node.data, node.right);
            } else {
                node = node.left || node.right;
            }
        }
        return node;
    }

     findMinValue(node) {
        if (!this.isEmpty()) {
            if (node === void 0) node = this.root;
            while (node.left) {
                node = node.left;
            }
            return node.value;
        }
    }

	size() {
 		var length = 0;
        this.traverse(function(node){length++;});
        return length;
 
    }

  	traverse(process){

  		    //helper function
        function inOrder(node){
            if (node){
                
                if (node.left !== null){
                    inOrder(node.left);
                }            
                
                process.call(this, node);
            
                if (node.right !== null){
                    inOrder(node.right);
                }
            }        
        }

        inOrder(this.root);    
	}

	isEmpty() {
		return this.root === null;
	}
}
