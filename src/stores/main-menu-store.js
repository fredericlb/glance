import airflux from "airflux";
import UiActions from "../actions/ui-actions";

class MainMenuStore  extends airflux.Store {
    constructor() {
        super();
        this.listenTo(UiActions.toggleMainMenu, this.onToggleMainMenu);
    }

    get state() {
        return 'toggle';
    }

    onToggleMainMenu() {
        this.publishState();
    }
}

export default new MainMenuStore();
