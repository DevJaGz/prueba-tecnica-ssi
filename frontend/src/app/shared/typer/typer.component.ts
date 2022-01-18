import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.scss']
})
export class TyperComponent implements OnInit {

  @Input() typingContent: string;
  @Input() infinite: boolean;
  @Input() initialWait: number;
  @Input() typingDelay: number;
  @Input() deleteWait: number;
  @Input() typeWait: number;
  @Input() deletingDelay: number;
  @Input() introMessage = false;
  @Input() introMessageContent = "";
  @Input() introMessageClasses = "";
  @Input() cursorColor = "";

  textArray: string[] = [];
  textArrayIndex = 0;
  charIndex = 0;
  textShown = "";
  typing = false;
  showCursor = false;
  showIntroMessage = false;
  constructor(private _elRef: ElementRef) {
    this.typingContent = "GOD IS | AMAZING";
    this.infinite = true;
    this.initialWait = 500;
    this.typingDelay = 100;
    this.deleteWait = 2000;
    this.typeWait = 500;
    this.deletingDelay = 100
  }

  ngOnInit(): void {
    this.textArray = this.typingContent.split("|").map((text: string) => text.trim());
    this.showIntroMessage = true;
    this._elRef.nativeElement.style.setProperty("--cursorColor", this.cursorColor)
    setTimeout(() => {
      this.type();
      this.showCursor = true;
    }, this.initialWait);
  }

  ngOnChanges(): void {
    this.resetValues();
  }

  sleep(ms: number): any {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async type() {
    this.typing = true;
    if (this.charIndex < this.textArray[this.textArrayIndex].length) {

      this.textShown += this.textArray[this.textArrayIndex].charAt(this.charIndex)
      this.charIndex++;
      await this.sleep(this.typingDelay);
      this.type();

    } else {
      this.typing = false;
      await this.sleep(this.deleteWait);
      this.delete();
    }

  }

  async delete() {
    this.typing = true;
    if (this.charIndex > 0) {
      this.textShown = this.textArray[this.textArrayIndex].substring(0, this.charIndex - 1)
      this.charIndex--;
      await this.sleep(this.deletingDelay);
      this.delete();

    } else {
      this.typing = false;
      this.textArrayIndex++;
      if (this.textArrayIndex >= this.textArray.length) {
        this.textArrayIndex = 0;
        if (this.infinite) {
          await this.sleep(this.typeWait);
          this.type();
        }
        else this.showCursor = false;
      } else {
        await this.sleep(this.typeWait);
        this.type();
      }

    }
  }


  resetValues() {
    this.textShown = "";
    this.textArrayIndex = 0;
    this.charIndex = 0;
    this.textArray = this.typingContent.split("|").map((text: string) => text.trim());;
  }



}
