import HistoryData from "@/data/HistoryData";
import TreeData from "@/data/treeData";

describe("Test history", () => {

    test("Add history", () => {
        const history = new HistoryData()
        history.add(new TreeData("Root", []))

        expect(history.count).toBe(1)
    })

    test("Can undo", () => {
        const history = new HistoryData()
        history.add(new TreeData("Root", []))

        expect(history.canUndo).toBe(true)
    })

    test("Cannot undo empty history", () => {
        const history = new HistoryData()

        expect(history.canUndo).toBe(false)
    })

    test("Cannot undo undid history", () => {
        const history = new HistoryData()
        history.add(new TreeData("Root", []))
        history.undo()

        expect(history.canUndo).toBe(false)
    })

    test("Can redo undid history", () => {
        const history = new HistoryData()
        history.add(new TreeData("Root", []))
        history.undo()

        expect(history.canRedo).toBe(true)
    })

    test("Undo history is correct", () => {
        const history = new HistoryData()
        history.add(new TreeData("Root", []))
        history.add(new TreeData("History 2", []))

        const h = history.undo()
        expect(h.name).toBe("History 2")

        const h2 = history.undo()
        expect(h2.name).toBe("Root")
    })

    test("Redo history is correct", () => {
        const history = new HistoryData(new TreeData("Root", []))
        history.add(new TreeData("History 1", []))
        history.add(new TreeData("History 2", []))

        history.undo()
        history.undo()

        expect(history.current.name).toBe("History 1")
        const h = history.redo()
        expect(h.name).toBe("History 2")
        const h2 = history.redo()
        expect(h2.name).toBe("Root")

        expect(history.canRedo).toBe(false)
    })
})