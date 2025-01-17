let global = this;

global.Java = {
    type: function(clazz) {
        const split = clazz.split(".");

        let returned = Packages;

        for (let i = 0; i < split.length; i++) {
            returned = returned[split[i]]
        }

        return returned
    }
}

// // Extra libs
global.ArrayList = Java.type("java.util.ArrayList");
global.HashMap = Java.type("java.util.HashMap");
global.Keyboard = Java.type("org.lwjgl.input.Keyboard");
global.ReflectionHelper = Java.type("net.minecraftforge.fml.relauncher.ReflectionHelper");

// Triggers
global.TriggerRegister = Java.type("com.chattriggers.ctjs.engine.langs.js.JSRegister").INSTANCE;
global.TriggerResult = Java.type("com.chattriggers.ctjs.triggers.OnTrigger.TriggerResult");
global.Priority = Java.type("com.chattriggers.ctjs.triggers.OnTrigger.Priority");
//#if MC<=10809
global.InteractAction = Java.type("net.minecraftforge.event.entity.player.PlayerInteractEvent.Action");
//#else
//$$ global.InteractAction = Java.type("com.chattriggers.ctjs.minecraft.listeners.ClientListener").INSTANCE.PlayerInteractAction;
//#endif

// Libraries
global.ChatLib = Java.type("com.chattriggers.ctjs.minecraft.libs.ChatLib");
global.EventLib = Java.type("com.chattriggers.ctjs.minecraft.libs.EventLib");

global.Renderer = Java.type("com.chattriggers.ctjs.minecraft.libs.renderer.Renderer");
global.Shape = Java.type("com.chattriggers.ctjs.minecraft.libs.renderer.Shape");
global.Rectangle = Java.type("com.chattriggers.ctjs.minecraft.libs.renderer.Rectangle");
global.Text = Java.type("com.chattriggers.ctjs.minecraft.libs.renderer.Text");
global.Image = Java.type("com.chattriggers.ctjs.minecraft.libs.renderer.Image");

global.Tessellator = Java.type("com.chattriggers.ctjs.minecraft.libs.Tessellator");
global.FileLib = Java.type("com.chattriggers.ctjs.minecraft.libs.FileLib");
global.MathLib = Java.type("com.chattriggers.ctjs.minecraft.libs.MathLib");

// Objects
global.Display = Java.type("com.chattriggers.ctjs.engine.langs.js.JSDisplay");
global.DisplayLine = Java.type("com.chattriggers.ctjs.engine.langs.js.JSDisplayLine");
global.DisplayHandler = Java.type("com.chattriggers.ctjs.minecraft.objects.display.DisplayHandler");
global.Gui = Java.type("com.chattriggers.ctjs.engine.langs.js.JSGui");
global.Message = Java.type("com.chattriggers.ctjs.minecraft.objects.message.Message");
global.TextComponent = Java.type("com.chattriggers.ctjs.minecraft.objects.message.TextComponent");
global.Book = Java.type("com.chattriggers.ctjs.minecraft.objects.Book");
global.KeyBind = Java.type("com.chattriggers.ctjs.minecraft.objects.KeyBind");
global.Image = Java.type("com.chattriggers.ctjs.minecraft.libs.renderer.Image");
global.Sound = Java.type("com.chattriggers.ctjs.minecraft.objects.Sound");
global.PlayerMP = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.PlayerMP");

// Wrappers
global.Client = Java.type("com.chattriggers.ctjs.minecraft.wrappers.Client");
global.Player = Java.type("com.chattriggers.ctjs.minecraft.wrappers.Player");
global.World = Java.type("com.chattriggers.ctjs.minecraft.wrappers.World");
global.Server = Java.type("com.chattriggers.ctjs.minecraft.wrappers.Server");
global.Inventory = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.Inventory");
global.TabList = Java.type("com.chattriggers.ctjs.minecraft.wrappers.TabList");
global.Scoreboard = Java.type("com.chattriggers.ctjs.minecraft.wrappers.Scoreboard");
global.CPS = Java.type("com.chattriggers.ctjs.minecraft.wrappers.CPS");
global.Item = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.Item");
global.Block = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.block.Block");
global.Sign = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.block.Sign");
global.Entity = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.Entity");
global.Action = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.action.Action");
global.ClickAction = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.action.ClickAction");
global.DragAction = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.action.DragAction");
global.KeyAction = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.action.KeyAction");
global.Particle = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.Particle");

// Triggers
global.OnChatTrigger = Java.type("com.chattriggers.ctjs.triggers.OnChatTrigger");
global.OnCommandTrigger = Java.type("com.chattriggers.ctjs.triggers.OnCommandTrigger");
global.OnRegularTrigger = Java.type("com.chattriggers.ctjs.triggers.OnRegularTrigger");
global.OnRenderTrigger = Java.type("com.chattriggers.ctjs.triggers.OnRenderTrigger");
global.OnSoundPlayTrigger = Java.type("com.chattriggers.ctjs.triggers.OnSoundPlayTrigger");
global.OnStepTrigger = Java.type("com.chattriggers.ctjs.triggers.OnStepTrigger");
global.OnTrigger = Java.type("com.chattriggers.ctjs.triggers.OnTrigger");

// Misc
global.Console = Java.type("com.chattriggers.ctjs.engine.langs.js.JSLoader").INSTANCE.getConsole();
global.Config = Java.type("com.chattriggers.ctjs.utils.config.Config").INSTANCE;
global.ChatTriggers = Java.type("com.chattriggers.ctjs.Reference").INSTANCE;
/*End Built in Vars */

// Thread
global.Thread = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.threading.WrappedThread");

// simplified methods
global.print = function(toPrint) {
    Console.out.println(toPrint);
}

global.cancel = function(event) {
    try {
        EventLib.cancel(event);
    } catch(err) {
        if (!event.isCancelable()) return;
        event.setCanceled(true);
    }
}

global.register = function(triggerType, methodName) {
    return TriggerRegister.register(triggerType, methodName);
}

// animation
global.easeOut = function(start, finish, speed, jump) {
    if (!jump) jump = 1;

    if (Math.floor(Math.abs(finish - start) / jump) > 0) {
        return start + (finish - start) / speed;
    } else {
        return finish;
    }
}

// Number.__proto__.easeOut = function(to, speed, jump) {
//     if (!jump) jump = 1;
//
//     if (Math.floor(Math.abs(to - this) / jump) > 0) {
//         this = this + (to - this) / speed;
//     } else {
//         this = to
//     }
// };

global.easeColor = function(start, finish, speed, jump) {
    return Renderer.color(
        easeOut((start >> 16) & 0xFF, (finish >> 16) & 0xFF, speed, jump),
        easeOut((start >> 8) & 0xFF, (finish >> 8) & 0xFF, speed, jump),
        easeOut(start & 0xFF, finish & 0xFF, speed, jump),
        easeOut((start >> 24) & 0xFF, (finish >> 24) & 0xFF, speed, jump)
    );
}

// Number.__proto__.easeColor = function(start, finish, speed, jump) {
//     this = Renderer.color(
//         easeOut((start >> 16) & 0xFF, (finish >> 16) & 0xFF, speed, jump),
//         easeOut((start >> 8) & 0xFF, (finish >> 8) & 0xFF, speed, jump),
//         easeOut(start & 0xFF, finish & 0xFF, speed, jump),
//         easeOut((start >> 24) & 0xFF, (finish >> 24) & 0xFF, speed, jump)
//     );
// };

global.setTimeout = function(func, delay) {
    new Thread(function() {
        Thread.sleep(delay);
        func();
    }).start();
}