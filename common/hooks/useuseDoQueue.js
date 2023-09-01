export default function useDoQueue() {
    let funcList = []
    let addFuncList = []

    const DoFunQueue = function() {

        const allHandlers = [...addFuncList, ...funcList];

        while (allHandlers.length > 0) {
            const {func, args} = allHandlers.pop();
            func(...args)
        }
        uni.stopPullDownRefresh();

    };

    const setFunctions = (func, ...args) => {
        funcList = [{func, args}]
    }

    const addFunctions = (func, ...args) => {
        addFuncList.push({func, args})
    }

    return {
        addFunctions,
        setFunctions,
        DoFunQueue,
    };
}

