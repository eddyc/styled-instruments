<CsoundSynthesizer>
<CsOptions>
-odac
</CsOptions>
<CsInstruments>
nchnls = 2
ksmps = 256
0dbfs = 1

; chnset 120,"bpm"
; instr 1
;  ibpm chnget "bpm"
;  itab1 table p5,1
;  itab2 table p5,2
;  k1 expon p4,p3,p4*0.001
;  ifr = cpspch(8.+itab1)
;  a1 oscili itab2*k1,ifr
;  chnset p5, "step"
;  outs a1,a1
;  inext = (p5 == 7 ? 0 : p5+1)
;  inxt = 30/ibpm
;  schedule 1,inxt,0.5,0.3+rnd(0.2),inext
; endin
; schedule 1,0,0.5,0.1,0
; gifn ftgen 1,0,8,-2,0,.02,.04,.05,.07,.09,.11,.12
; gifn ftgen 2,0,8,-2,1,1,1,1,1,1,1,1

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
