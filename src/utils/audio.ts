// Web Audio API Synthesizer for Zen Bowl Acoustic Resonance & Spatial Ambiance
class SolsticeAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private bowlOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAudio(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playSingingBowl(216); // 216 Hz meditative resonance
    }
    return !this.isMuted;
  }

  public getStatus(): boolean {
    return !this.isMuted;
  }

  public playSingingBowl(fundamental: number = 216) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Singing bowl has rich harmonic overtones (fundamental, 2.76x, 5.4x)
      const harmonics = [1.0, 2.76, 5.4];
      const gains = [0.06, 0.03, 0.015];

      harmonics.forEach((ratio, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * ratio, now);

        gain.gain.setValueAtTime(gains[index], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch {}
  }

  public playTactileTouch() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now);
      osc.frequency.exponentialRampToValueAtTime(108, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }
}

export const solsticeAudio = new SolsticeAudio();
