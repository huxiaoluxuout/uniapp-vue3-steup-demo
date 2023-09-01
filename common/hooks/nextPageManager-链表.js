class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }
}

class DataList {
    constructor(pageSize) {
        this.page = 0;
        this.notFullLen = 0;
        this.pageSize = pageSize;
        this.dataList = new LinkedList();
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
            this.dataList.append(data);
        }
    }
}

const dataList = new DataList(10); // 设置每页大小为10
dataList.updateDataList([1, 2, 3, 4, 5]); // 更新数据列表
