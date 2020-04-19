import { Component,OnInit ,AfterViewChecked, AfterViewInit, OnChanges, SimpleChanges,ChangeDetectorRef} from '@angular/core';

import {NzMessageService} from 'ng-zorro-antd';

import {Router} from '@angular/router';
import {ConfigService} from '../../../core/service/config.service';
declare var editormd: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})

export class WelcomeComponent implements OnInit{

  test = '###  方法1： 分布查询\n' +
    '分步查询就是执行两个sql语句\n' +
    '一对一比较简单，就比如一个学生对应一个班级，或者说一个用户有一个用户资料。\n' +
    '\n' +
    '例子：user表和user_information表，一个用户对应一个用户资料，用id进行关联。\n' +
    '实现登录的时候查询user表，把相关联的userinformation也查出来。\n' +
    '\n' +
    '1. JavaBean\n' +
    '\n' +
    'User.java\n' +
    '\n' +
    '```java\n' +
    '@Data\n' +
    'public class User {\n' +
    '\n' +
    '    /**\n' +
    '     * 用户id\n' +
    '     */\n' +
    '    private String id;\n' +
    '\n' +
    '    /**\n' +
    '     * 用户名\n' +
    '     */\n' +
    '    private String username;\n' +
    '\n' +
    '    /**\n' +
    '     * 密码\n' +
    '     */\n' +
    '    private String password;\n' +
    '\n' +
    '    /**\n' +
    '     * 用户信息\n' +
    '     */\n' +
    '    private UserInformation information;\n' +
    '}\n' +
    '```\n' +
    '\n' +
    'UserInformation.java\n' +
    '\n' +
    '```java\n' +
    '@Data\n' +
    'public class UserInformation {\n' +
    '\n' +
    '    /**\n' +
    '     * id\n' +
    '     */\n' +
    '    private String id;\n' +
    '\n' +
    '    /**\n' +
    '     * 姓名\n' +
    '     */\n' +
    '    private String name;\n' +
    '\n' +
    '    /**\n' +
    '     * 性别\n' +
    '     */\n' +
    '    private String sex;\n' +
    '\n' +
    '    /**\n' +
    '     * 年龄\n' +
    '     */\n' +
    '    private Integer age;\n' +
    '\n' +
    '    /**\n' +
    '     * 头像地址\n' +
    '     */\n' +
    '    private String imageUrl;\n' +
    '\n' +
    '    /**\n' +
    '     * 手机号\n' +
    '     */\n' +
    '    private String phone;\n' +
    '}\n' +
    '```\n' +
    '\n' +
    '2， UserMapper.java\n' +
    '```java\n' +
    '@Repository\n' +
    'public interface UserMapper {\n' +
    '    /**\n' +
    '    * 登录功能\n' +
    '    *\n' +
    '    * @param username  用户名\n' +
    '    * @param password 密码\n' +
    '    * @return com.sk.cloudmvc.model.User\n' +
    '    * @author qiaochunxiang\n' +
    '    * @date 15:17 2020/3/24\n' +
    '    **/\n' +
    '    User login(@Param("username") String username, @Param("password") String password);\n' +
    '}\n' +
    '```\n' +
    '\n' +
    'UserInformationMapper.java\n' +
    '\n' +
    '```java\n' +
    '@Repository\n' +
    'public interface UserInformationMapper {\n' +
    '    /**\n' +
    '     * 按照id查找用户资料\n' +
    '     *\n' +
    '     * @param id 用户id\n' +
    '     * @return com.sk.cloudmvc.model.UserInformation\n' +
    '     * @author qiaochunxiang\n' +
    '     * @date 16:15 2020/3/26\n' +
    '     **/\n' +
    '    UserInformation findById(String id);\n' +
    '}\n' +
    '```\n' +
    '\n' +
    '3. xml文件\n' +
    '首先看UserInformation的xml文件\n' +
    '\n' +
    '```xml\n' +
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n' +
    '<mapper namespace="com.sk.cloudmvc.dao.UserInformationMapper">\n' +
    '    <resultMap id="userinformation" type="com.sk.cloudmvc.model.UserInformation">\n' +
    '        <id property="id" column="id"/>\n' +
    '        <result property="name" column="name"/>\n' +
    '        <result property="sex" column="sex"/>\n' +
    '        <result property="age" column="age"/>\n' +
    '        <result property="imageUrl" column="image_url"/>\n' +
    '        <result property="phone" column="phone"/>\n' +
    '    </resultMap>\n' +
    '    <select id="findById" resultMap="userinformation">\n' +
    '        select * from userinformation where id = #{id}\n' +
    '    </select>\n' +
    '</mapper>\n' +
    '```\n' +
    '\n' +
    'ResultMap标签就是为了建立JavaBean和数据库字段的练习，避免属性名不一样绑定不上的错误，就比如上面的imageUrl\n' +
    '\n' +
    '下面看User的xml文件\n' +
    '```xml\n' +
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n' +
    '<mapper namespace="com.sk.cloudmvc.dao.UserMapper">\n' +
    '    <resultMap id="user" type="com.sk.cloudmvc.model.User">\n' +
    '        <id column="id" property="id"/>\n' +
    '        <result property="username" column="username"/>\n' +
    '        <result property="password" column="password"/>\n' +
    '        <association property="information" column="id"  javaType="com.sk.cloudmvc.model.UserInformation" select="com.sk.cloudmvc.dao.UserInformationMapper.findById"/>\n' +
    '    </resultMap>\n' +
    '    <select id="login" resultMap="user">\n' +
    '        select * from user where username = #{username} and password = #{password}\n' +
    '    </select>\n' +
    '</mapper>\n' +
    '```\n' +
    '\n' +
    '因为user.java里面有一个userinformation的属性，仔细看上面的ResultMap，里面有一个association标签，这个就是为了简历两个表的级联关系，这里是一对一的关系。这里的作用就是当查询user表的时候，也自动查询userinformation表的信息，根据id查询。\n' +
    '```\n' +
    '        <association property="information" column="id"  javaType="com.sk.cloudmvc.model.UserInformation" select="com.sk.cloudmvc.dao.UserInformationMapper.findById"/>\n' +
    '```\n' +
    'select对应的是namespace+方法id的全称。这里的id是本表的id，这行代码的意思其实就是，把表的id字段传递给select对应的那个方法，查出的数据封装成javaType里面的类，然后赋值给这个类里面的property对应的属性名。\n' +
    '\n' +
    '\n' +
    '###  方法二：单步查询\n' +
    '单步查询其实就是一个sql就把数据都查出来\n' +
    '\n' +
    '两个JavaBean不变，Mapper可以只有一个UserMapper，代码也不变，但是对应的就变了。\n' +
    '\n' +
    '```xml\n' +
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">\n' +
    '<mapper namespace="com.sk.cloudmvc.dao.UserMapper">\n' +
    '\n' +
    '    <resultMap id="user" type="com.sk.cloudmvc.model.User">\n' +
    '        <id property="id" column="id"/>\n' +
    '        <result property="username" column="username"/>\n' +
    '        <result property="password" column="password"/>\n' +
    '        <!--        这么写的一个作用就是把下面查出来的userinformation表的数据按这个字段封装起来。-->\n' +
    '        <association property="information" javaType="com.sk.cloudmvc.model.UserInformation">\n' +
    '            <id property="id" column="id"/>\n' +
    '            <result property="name" column="name"/>\n' +
    '            <result property="sex" column="sex"/>\n' +
    '            <result property="age" column="age"/>\n' +
    '            <result property="imageUrl" column="image_url"/>\n' +
    '            <result property="phone" column="phone"/>\n' +
    '        </association>\n' +
    '    </resultMap>\n' +
    '    <select id="login" resultMap="user">\n' +
    '        select u.*,ui.* from user u, userinformation ui where u.id = ui.id and u.username = #{username} and u.password = #{password}\n' +
    '    </select>\n' +
    '</mapper>\n' +
    '```\n' +
    '仔细看上面的sql语句，同时把两个表的数据都查出来了，然后封装成上面的ResultMap，';
  constructor(private message: NzMessageService,
              private router: Router,
              private cdRef: ChangeDetectorRef,
              private config: ConfigService
              ) {
  }

  ngOnInit(): void {

  }
}
