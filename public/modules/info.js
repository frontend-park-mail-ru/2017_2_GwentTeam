

export default class Info {
    turnonInfo(mes) {
        this.backResult = document.createElement('div');
        this.backResult.setAttribute('class', 'background-loader');

        this.result = document.createElement('div');
        this.result.setAttribute('class', 'info');

        document.body.appendChild(this.backResult);
        this.result.innerHTML = mes;
        this.backResult.appendChild(this.result);
        this.okButton = document.createElement('div');
        this.okButton.setAttribute('class', 'okButton');
        this.okButton.innerHTML = 'Ок';
        this.result.appendChild(this.okButton);
        this.okButton.onclick = () => {
            this.turnoffInfo();
        };
    }

    turnoffInfo() {
        this.backResult.style.display = 'none';
        this.result.style.display = 'none';
        this.okButton.style.display = 'none';
    }
}