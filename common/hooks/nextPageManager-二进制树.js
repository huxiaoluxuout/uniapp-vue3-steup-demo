class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
}

class DataList {
    constructor(pageSize) {
        this.page = 0;
        this.notFullLen = 0;
        this.pageSize = pageSize;
        this.dataList = new BinaryTree();
    }

    updateDataList(newResDataList) {
        if (!Array.isArray(newResDataList)) {
            throw new Error('传入数据只能是数组');
        }

        const isFullPage = newResDataList.length % this.pageSize === 0;
        if (isFullPage && this.pageSize !== 0) {
            this.page++;
            this.notFullLen = 0;
        } else {
            if (!this.notFullLen) {
                this.notFullLen = newResDataList.length;
            } else {
                throw new Error('已经到底了,尝试刷新吧');
            }
        }

        for (const data of newResDataList) {
            this.dataList.insert(data);
        }
    }
}

const dataList = new DataList(10); // 设置每页大小为10
dataList.updateDataList([1, 2, 3, 4, 5]); // 更新数据列表
