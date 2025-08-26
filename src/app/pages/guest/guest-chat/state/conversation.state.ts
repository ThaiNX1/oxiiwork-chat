import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

export class Push {
    constructor(public payload: any) { }
    static readonly type = '[Conversation] Push';
}
export class Reset { static readonly type = '[Conversation] Reset'; }

@State<any>({
    name: 'conversation',
    defaults: { value: null },
})
@Injectable()
export class ConversationState {
    @Selector()
    static value(state: any) {
        return state.value;
    }
    @Action(Push)
    push(ctx: StateContext<any>, { payload }: Push) {
        ctx.patchState({ value: payload });
    }

    @Action(Reset)
    reset(ctx: StateContext<any>) {
        ctx.setState({ value: null });
    }
}