
var JobItemComponent = {
	props: {
		title: String,
		status: String,
		create: String,
		url: String
	},
	template: '<li><a :href="url">{{ title }}</a> - {{ status }} - {{ create }}</li>'
}

const data = {
		jobList: [
			{
				id: 0,
				title: 'Job-01',
				status: 'Complete',
				create: 'Tue Aug 07 2018 14:37:53 GMT+0800 (China Standard Time)',
				url: './detail.html?id=0'
			},
			{
				id: 1,
				title: 'Job-02',
				status: 'Complete',
				create: 'Tue Aug 07 2018 14:37:53 GMT+0800 (China Standard Time)',
				url: './detail.html?id=1'
			},
			{
				id: 2,
				title: 'Job-03',
				status: 'Running',
				create: 'Tue Aug 07 2018 14:37:53 GMT+0800 (China Standard Time)',
				url: './detail.html?id=2'
			},
			{
				id: 3,
				title: 'Job-04',
				status: 'Started',
				create: 'Tue Aug 07 2018 14:37:53 GMT+0800 (China Standard Time)',
				url: './detail.html?id=3'
			}
		],
		id: 0
}

var app = new Vue({

	el: '#data-migration',

	components: {
		'job-item' : JobItemComponent
	},

	data: data,
	created: function () {
		this.id = this.jobList.length;
	},

	computed: {
		urlLink: function () {
			// var job = this.jobList.filter(function(item) {
			// 	return item.id === id
			// });

			var job = this.jobList[0];
			return 'file://'+window.location.pathname+'?'+'title='+job.title+'&'+'status='+job.status+'&'+'date='+job.create;
		},
		title: function () {
			var id = this.urlParamsValueForKey('id');
			var job = this.jobList[id];
			return job.title;
		},
		status: function () {
			var id = this.urlParamsValueForKey('id');
			var job = this.jobList[id];
			return job.status;
		},
		date: function () {
			var id = this.urlParamsValueForKey('id');
			var job = this.jobList[id];
			return job.create;
		},
		numberOfCompleteJobs: function () {
			let jobs = this.jobList;
			return jobs.filter( (job) => {
				return job.status === 'Complete';
			}).length;
		},
		numberOfRunningJobs: function () {
			let jobs = this.jobList;
			return jobs.filter( (job) => {
				return job.status === 'Running';
			}).length;
		},
		numberOfNewJobs: function () {
			let jobs = this.jobList;
			return jobs.filter( (job) => {
				return job.status === 'Started';
			}).length;
		}
	},

	methods: {
		urlParamsValueForKey: function (key) {
			return new URLSearchParams(window.location.search).get(key);
		},
		addJob: function () {
			this.jobList.push({
				id: this.id,
				title: this.newTitle,
				status: this.newStatus,
				create: Date(Date.now()),
				url: './detail.html?id='+this.id
			});
			this.id++;
		}
	}
});