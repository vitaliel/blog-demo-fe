import { Component, OnInit } from '@angular/core';
import { PostsApiService } from './core/api/posts-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts = [];
  form: FormGroup;

  constructor(
    private api: PostsApiService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      content: [null, Validators.required],
    })

    this.api.index().subscribe(data => {
      this.posts = data.posts;
    })
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    this.api.create(this.form.value.content).subscribe(post => {
      this.posts = [post].concat(...this.posts);
      this.form.get('content').setValue(null);
    });
  }
}
