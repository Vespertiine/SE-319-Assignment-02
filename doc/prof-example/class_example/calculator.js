class Calc {
    constructor() {
        this.model = {};
        this.view = {
            textRow : {id: "textRow", type: "text", value: "", onclick:""},
            button7 : {id: "button7", type: "button", value: 7, onclick:""},
            button8 : {id: "button8", type: "button", value: 8, onclick:""}
        };
        this.controller = {};
    }

    run() {
        this.attachHandlers();
        console.log(this.display());
        return this.display();
    }

    displayElement(element) {
        const { id, type, value, onclick } = element;

        return `<input id="${id}" type="${type}" value="${value}" onclick="${onclick}"`;
    }

    display() {
        return `
            <table id="myTable" border=2>
                <tr>
                    <td>
                        ${this.displayElement(this.view.textRow)}
                    </td>
                </tr>
                <tr>
                    <td>
                        ${this.displayElement(this.view.button7)}
                        ${this.displayElement(this.view.button8)}
                    </td>
                </tr>
            </table>
        `;
    }

    attachHandlers() {
        this.view.button7.onclick = "Calc.button7Handler()"; 
    }

    static button7Handler() {
        alert("Hi");
    }
}
