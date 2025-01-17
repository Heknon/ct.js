package com.chattriggers.ctjs.utils

import com.chattriggers.ctjs.Reference
import com.chattriggers.ctjs.minecraft.libs.ChatLib
import com.chattriggers.ctjs.minecraft.libs.FileLib
import com.chattriggers.ctjs.minecraft.libs.renderer.Renderer
import com.chattriggers.ctjs.minecraft.objects.message.Message
import com.chattriggers.ctjs.minecraft.objects.message.TextComponent
import com.chattriggers.ctjs.minecraft.wrappers.World
import com.chattriggers.ctjs.print
import com.chattriggers.ctjs.utils.config.Config
import com.chattriggers.ctjs.utils.kotlin.fromJson
import com.chattriggers.ctjs.utils.kotlin.toVersion
import com.google.gson.Gson
import net.minecraft.client.renderer.GlStateManager
import net.minecraftforge.client.event.RenderGameOverlayEvent
import net.minecraftforge.event.world.WorldEvent
import net.minecraftforge.fml.common.eventhandler.SubscribeEvent

object UpdateChecker {
    private var worldLoaded = false
    private var updateAvailable = false
    private var warned = false

    init {
        try {
            getUpdate()
        } catch (exception: Exception) {
            exception.print()
        }
        warned = !Config.showUpdatesInChat
    }

    private fun getUpdate() {
        val latestVersion = Gson().fromJson<List<String>>(
            FileLib.getUrlContent("https://www.chattriggers.com/api/versions")
        ).take(1).map(String::toVersion).first()

        this.updateAvailable = latestVersion > Reference.MODVERSION.toVersion()
    }

    @SubscribeEvent
    fun worldLoad(event: WorldEvent.Load) {
        this.worldLoaded = true
    }

    @SubscribeEvent
    fun renderOverlay(event: RenderGameOverlayEvent) {
        if (!this.worldLoaded) return
        this.worldLoaded = false

        if (!this.updateAvailable || this.warned) return

        World.playSound("note.bass", 1000f, 1f)
        Message(
            "&c&m" + ChatLib.getChatBreak("-"),
            "\n",
            "&cChatTriggers requires an update to work properly!",
            "\n",
            TextComponent("&a[Download]").setClick("open_url", "https://www.chattriggers.com/#download"),
            " ",
            TextComponent("&e[Changelog]").setClick("open_url", "https://github.com/ChatTriggers/ct.js/releases"),
            "\n",
            "&c&m" + ChatLib.getChatBreak("-")
        ).chat()

        this.warned = true
    }

    fun drawUpdateMessage() {
        if (!this.updateAvailable) return

        GlStateManager.pushMatrix()

        Renderer.getFontRenderer()
            .drawString(
                ChatLib.addColor("&cChatTriggers requires an update to work properly!"),
                2f,
                2f,
                -0x1,
                false
            )

        GlStateManager.popMatrix()
    }
}