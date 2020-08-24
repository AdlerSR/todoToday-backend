"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Users_1 = __importDefault(require("./Users"));
var Todo = /** @class */ (function () {
    function Todo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Todo.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todo.prototype, "user_id");
    __decorate([
        typeorm_1.ManyToOne(function () { return Users_1["default"]; }),
        typeorm_1.JoinColumn({ name: 'user_id' }),
        __metadata("design:type", Users_1["default"])
    ], Todo.prototype, "user");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todo.prototype, "title");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Todo.prototype, "content");
    __decorate([
        typeorm_1.Column('boolean'),
        __metadata("design:type", Boolean)
    ], Todo.prototype, "checked");
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Todo.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Todo.prototype, "updated_at");
    Todo = __decorate([
        typeorm_1.Entity('todos')
    ], Todo);
    return Todo;
}());
exports["default"] = Todo;
