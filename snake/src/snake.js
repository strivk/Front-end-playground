const DEF_SIZE = 10;
const BODY_COLOR = '#333';
const HEAD_COLOR = '#0089A7';

function _makeBodyNode(nodeX, nodeY) {
    return {
        color: BODY_COLOR,
        x: nodeX,
        y: nodeY
    };
}

export default class {
    constructor(options) {
        options = options || {};
        this.size = DEF_SIZE;               // node size
        this.stepSize = this.size;          // size of moving step
        this.bodyColor = options.bodyColor || BODY_COLOR;   // body color
        this.headColor = options.headColor || HEAD_COLOR;   // head color
    }

    init(x, y) {
        this.body = [];  // head is the last element
        this.nextStep({
            x: 1,
            y: 0
        });

        // 3 nodes long initially □□□
        let count = 0;
        while (count < 3) {
            let node = _makeBodyNode(x - this.stepSize * count, y);
            this.addNode(node);
            count++;
        }
    }

    // Snake moves in the given direction
    move() {
        let count = 0;

        while(count < this.getLength()) {
            let nextNode = this.body[count + 1];
            let currNode = this.body[count];

            // move current node to the position of the next node,
            if (nextNode) {
                currNode.x = nextNode.x;
                currNode.y = nextNode.y;
            } else {
                // move head one step further in the given direction
                currNode.x = currNode.x + this.snakeX * this.stepSize;
                currNode.y = currNode.y + this.snakeY * this.stepSize;
            }

            count++;
        }
    }

    nextStep(dir) {
        this.snakeX = dir.x;
        this.snakeY = dir.y;
    }

    // Append one node to the body
    addNode(node) {
        if (!node) {
            throw new Error('node is undefined.');
        }
        // if length is 0, then it's the head
        if (this.getLength() === 0) {
            node.color = this.headColor;
        }
        this.body.unshift(node);
        return this;
    }

    // Make snake one node longer
    grow() {
        let head = this.getHead();
        let newHead = _makeBodyNode(head.x, head.y);
        head.color = BODY_COLOR;
        newHead.color = HEAD_COLOR;
        // pop the old head and add it to tail
        this.body.pop();
        this.body.unshift(head);
        // push the new head
        this.body.push(newHead);
    }

    nodeAt(index) {
        return this.body[index];
    }

    getHead() {
        return this.body[this.body.length - 1];
    }

    getTail() {
        return this.body[0];
    }

    getLength() {
        return this.body.length;
    }
}
